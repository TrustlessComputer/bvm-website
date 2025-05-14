import React from 'react';

import { useFormik } from 'formik';

const App: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      inputField: '',
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
    <div>
      <h1>Hello, World!</h1>
      <p>Welcome to your first React TypeScript app.</p>
        <input
          id="inputField"
          name="inputField"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.inputField}
        />
        <button type="submit">Submit</button>
    </div>
    </form>
  );
};

export default App;
