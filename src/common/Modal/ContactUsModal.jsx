import React from "react";
import CommonModal from "./CommonModal";
import { useFormik } from "formik";
import CustomInput from "./../UI/CustomInput/CustomInput";
import CommonButton from "../CommonButton/CommonButton";
import { Form } from "react-bootstrap";
import CustomSelect from "./../UI/Select/CustomSelect";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./ContactUsModal.scss";

const ContactUsModal = ({ show, handleClose }) => {
  const options = [
    { value: "animation", label: "Animation" },
    { value: "vfx", label: "VFX" },
    { value: "webgraphics", label: "Web & Graphics" },
    { value: "filmmaking", label: "Film Making" },
    { value: "photography", label: "Photography" },
    { value: "videoediting", label: "Video Editing" },
    { value: "digitalmarketing", label: "Digital Marketing" },
    { value: "ai", label: "AI Content Creation" },
  ];

  const timeSlots = [
    { value: "11:00am - 12:00pm", label: "11:00am - 12:00pm" },
    { value: "12:00pm - 1:00pm", label: "12:00pm - 1:00pm" },
    { value: "1:00pm - 2:00pm", label: "1:00pm - 2:00pm" },
    { value: "4:00pm - 5:00pm", label: "4:00pm - 5:00pm" },
    { value: "5:00pm - 6:00pm", label: "5:00pm - 6:00pm" },
  ];
  const initial = {
    name: "",
    email: "",
    phone: "",
    course: "",
    timeSlot: "",
    captchaToken: "",
  };

  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = "Please enter your name";
    }
    if (!values.email) {
      errors.email = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }
    if (!values.phone) {
      errors.phone = "Please enter your phone number";
    }
    if (!values.course) {
      errors.course = "Please select a course";
    }
    if (!values.timeSlot) {
      errors.timeSlot = "Please select a time slot";
    }
    if (!values.captchaToken) {
      errors.captchaToken = "Please verify the reCAPTCHA";
    }

    return errors;
  };

  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    setFieldValue,
  } = useFormik({
    initialValues: initial,
    validate,
    onSubmit: async (values, { resetForm }) => {
      const formData = new FormData();
      formData.append("access_key", "a6baaa41-ff5b-45a6-8e46-ffff5b66245e");
      // formData.append("access_key", "bb345f89-5331-4375-8bd4-2b09315e4945");

      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("phone", values.phone);
      formData.append("course", values.course);
      formData.append("timeSlot", values.timeSlot); // 🆕 Append time slot
      formData.append("g-recaptcha-response", values.captchaToken);

      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: formData,
        });
        const result = await response.json();
        if (result.success) {
          toast.success("Form submitted successfully!");
          resetForm();
          handleClose();
        } else {
          toast.error("Form submission failed! Try again.");
        }
      } catch (error) {
        toast.error("Error submitting form. Please try again.");
      }
    },
  });

  return (
    <>
      <CommonModal
        show={show}
        handleClose={handleClose}
        className="logout-modal"
        heading="Contact Us"
      >
        <div>
          <Form onSubmit={handleSubmit} className="form-contact">
            <CustomInput
              label="Name"
              type="text"
              value={values.name}
              onChange={handleChange}
              name="name"
            />
            {errors.name && <p className="error">{errors.name}</p>}

            <CustomInput
              label="Email"
              type="email"
              value={values.email}
              onChange={handleChange}
              name="email"
            />
            {errors.email && <p className="error">{errors.email}</p>}

            <CustomInput
              label="Phone"
              type="number"
              value={values.phone}
              onChange={handleChange}
              name="phone"
            />
            {errors.phone && <p className="error">{errors.phone}</p>}

            <div>
              <label htmlFor="course" className="form-label mt-4">
                Select Course
              </label>
              <CustomSelect
                options={options}
                name="course"
                value={
                  options.find((option) => option.value === values.course) || ""
                }
                onChange={(selectedOption) =>
                  setFieldValue("course", selectedOption.value)
                }
              />
              {errors.course && <p className="error">{errors.course}</p>}
            </div>

            <div>
              <label htmlFor="timeSlot" className="form-label mt-4">
                Select Time Slot
              </label>
              <CustomSelect
                options={timeSlots}
                name="timeSlot"
                value={
                  timeSlots.find((slot) => slot.value === values.timeSlot) || ""
                }
                onChange={(selectedOption) =>
                  setFieldValue("timeSlot", selectedOption.value)
                }
              />
              {errors.timeSlot && <p className="error">{errors.timeSlot}</p>}
            </div>

            <CommonButton text="Submit" type="submit" className="mt-5 w-100" />
          </Form>
        </div>
      </CommonModal>
    </>
  );
};

export default ContactUsModal;
