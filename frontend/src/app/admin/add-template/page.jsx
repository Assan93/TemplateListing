import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const TemplateForm = () => {
  const templateForm = useFormik({
    initialValues: {
      rating: ''
    },
    validationSchema: Yup.object({
      rating: Yup.number()
        .min(1, "Minimum rating is 1")
        .max(5, "Maximum rating is 5")
        .required("Rating is required"),
    }),
    onSubmit: (values) => {
      console.log("Form submitted:", values);
    },
  });

  return (
    <form onSubmit={templateForm.handleSubmit} className="max-w-md mx-auto p-4">
      {/* Rating Field */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Rating (1-5)</label>
        <input
          type="number"
          name="rating"
          min={1}
          max={5}
          step={0.1}
          onChange={templateForm.handleChange}
          onBlur={templateForm.handleBlur}
          value={templateForm.values.rating || ''}
          className="mt-1 block w-full rounded-md bg-white border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500"
        />
        {templateForm.touched.rating && templateForm.errors.rating && (
          <p className="text-red-500 text-xs mt-1">{templateForm.errors.rating}</p>
        )}
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
  );
};

export default TemplateForm;
