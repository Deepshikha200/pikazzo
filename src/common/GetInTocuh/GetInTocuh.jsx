import React, { useState } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomInput from "./../UI/CustomInput/CustomInput";
import CommonButton from "../CommonButton/CommonButton";
import { Form } from "react-bootstrap";
import CustomSelect from "./../UI/Select/CustomSelect";
import "./GetInTocuh.scss";

const GetInTocuh = () => {
  const [result, setResult] = useState("");

  const courseOptions = [
    { value: "animation", label: "Animation" },
    { value: "vfx", label: "VFX" },
    { value: "webgraphics", label: "Web & Graphics" },
    { value: "filmmaking", label: "Film Making" },
    { value: "photography", label: "Photography" },
    { value: "videoediting", label: "Video Editing" },
    { value: "digitalmarketting", label: "Digital Marketing" },
    { value: "ai", label: "AI Content Creation" },
  ];
  const timeSlotOptions = [
    { value: "11:00am - 12:00pm", label: "11:00am - 12:00pm" },
    { value: "12:00pm - 1:00pm", label: "12:00pm - 1:00pm" },
    { value: "1:00pm - 2:00pm", label: "1:00pm - 2:00pm" },
    { value: "4:00pm - 5:00pm", label: "4:00pm - 5:00pm" },
    { value: "5:00pm - 6:00pm", label: "5:00pm - 6:00pm" },
  ];

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
    if (!values.timeslot) {
      errors.timeslot = "Please select a time slot";
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: { name: "", email: "", phone: "", course: "", timeslot: "" },
    validate,
    onSubmit: async (values, { resetForm }) => {
      setResult("Sending....");
      const formData = new FormData();
      formData.append("access_key", "a6baaa41-ff5b-45a6-8e46-ffff5b66245e");
      // formData.append("access_key", "bb345f89-5331-4375-8bd4-2b09315e4945");

      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("phone", values.phone);
      formData.append("course", values.course);
      formData.append("timeslot", values.timeslot);

      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: formData,
        });
        const data = await response.json();
        if (data.success) {
          setResult("Form Submitted Successfully");
          toast.success("Form Submitted Successfully!");
          resetForm();
        } else {
          setResult(data.message);
          toast.error(data.message);
        }
      } catch (error) {
        setResult("Error submitting form");
        toast.error("Error submitting form");
      }
    },
  });

  return (
    <div className="form-page">
      <h2 className="mb-3">Enquiry </h2>
      <Form onSubmit={formik.handleSubmit} className="form-contact">
        <CustomInput
          label="Name"
          type="text"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
        />
        {formik.errors.name && <p className="error">{formik.errors.name}</p>}

        <CustomInput
          label="Email"
          type="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        {formik.errors.email && <p className="error">{formik.errors.email}</p>}

        <CustomInput
          label="Phone"
          type="number"
          name="phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
        />
        {formik.errors.phone && <p className="error">{formik.errors.phone}</p>}

        <div>
          <label className="form-label mt-4">Select Course</label>
          <CustomSelect
            options={courseOptions}
            name="course"
            value={
              courseOptions.find(
                (option) => option.value === formik.values.course
              ) || ""
            }
            onChange={(selectedOption) => {
              formik.setFieldValue("course", selectedOption.value);
            }}
          />
          {formik.errors.course && (
            <p className="error">{formik.errors.course}</p>
          )}
        </div>

        <div>
          <label className="form-label mt-4">Select Time Slot</label>
          <CustomSelect
            options={timeSlotOptions}
            name="timeslot"
            value={
              timeSlotOptions.find(
                (option) => option.value === formik.values.timeslot
              ) || ""
            }
            onChange={(selectedOption) => {
              formik.setFieldValue("timeslot", selectedOption.value);
            }}
          />
          {formik.errors.timeslot && (
            <p className="error">{formik.errors.timeslot}</p>
          )}
        </div>

        <CommonButton text="Submit" type="submit" className="mt-4" />
      </Form>
      <span>{result}</span>
    </div>
  );
};

export default GetInTocuh;
