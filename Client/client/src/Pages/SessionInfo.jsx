import {
  Box,
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import Header from "./global/Header";
import { operators } from "../Data/MockData";
import { useNavigate } from "react-router-dom";
import { sessionCreation } from "../services/AuthApi";
import { useState } from "react";
import { toast } from "react-hot-toast"

const Form = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const hidden = false;

  const handleFormSubmit = async (values) => {
    try {
      await sessionCreation(values);
      toast.success("Session Created Successfully");
      setMessage("Session created successfully!");
      navigate("/user_sessions");
    } catch (error) {
      setMessage("Failed to create session. Please try again.");
    }
  };

  return (
    <Box ml={32} mt={9} mr={1}>
      <Header title="CREATE SESSION" subtitle="Create a new Session" />
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box display="grid" gap="30px">
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Session Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.id}
                name="id"
                error={!!touched.id && !!errors.id}
                helperText={touched.id && errors.id}
                sx={{ gridColumn: "span 2"}}
              />
              <Box display="flex" gap="30px">
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Sender's Number"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.sender}
                  name="sender"
                  error={!!touched.sender && !!errors.sender}
                  helperText={touched.sender && errors.sender}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Receiver's Number"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.reciever}
                  name="reciever"
                  error={!!touched.reciever && !!errors.reciever}
                  helperText={touched.reciever && errors.reciever}
                  sx={{ gridColumn: "span 2" }}
                />
              </Box>
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Proxy Number"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.proxy}
                  name="proxy"
                  error={!!touched.proxy && !!errors.proxy}
                  helperText={touched.proxy && errors.proxy}
                  sx={{ gridColumn: "span 1" }}
                />
                <FormControl
                  fullWidth
                  variant="filled"
                  sx={{ gridColumn: "span 1" }}
                >
                  <InputLabel id="reciever-operator-label">
                    Receiver's Operator
                  </InputLabel>
                  <Select
                    labelId="reciever-operator-label"
                    value={values.recieverOperator}
                    name="recieverOperator"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      !!touched.recieverOperator && !!errors.recieverOperator
                    }
                  >
                    {operators.map((operator) => (
                      <MenuItem key={operator.code} value={operator.code}>
                        {operator.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {touched.recieverOperator && errors.recieverOperator && (
                    <div style={{ color: "red" }}>
                      {errors.recieverOperator}
                    </div>
                  )}
                </FormControl>
                <FormControl
                  fullWidth
                  variant="filled"
                  sx={{ gridColumn: "span 1" }}
                >
                  <InputLabel id="operator-label">Sender's Operator</InputLabel>
                  <Select
                    labelId="operator-label"
                    value={values.operator}
                    name="operator"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.operator && !!errors.operator}
                  >
                    {operators.map((operator) => (
                      <MenuItem key={operator.code} value={operator.code}>
                        {operator.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {touched.operator && errors.operator && (
                    <div style={{ color: "red" }}>{errors.operator}</div>
                  )}
                </FormControl>
              <TextField
                fullWidth
                variant="filled"
                label="Message"
                multiline
                rows={3}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.message}
                name="message"
                error={!!touched.message && !!errors.message}
                helperText={touched.message && errors.message}
                sx={{ gridColumn: "span 3" }}
              />
            </Box>
            {message && (
              <Typography variant="body1" color="success.main" mt={2}>
                {message}
              </Typography>
            )}
            {
              hidden && <TextField
              fullWidth
              variant="filled"
              label="status"
              display="none"
              value={values.status}
              sx={{ gridColumn: "span 3" }}
            />
            }
            <Box display="flex" justifyContent="end" mt="20px" fontWeight="600">
              <Button type="submit" color="secondary" variant="contained">
                Start Session
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  id: yup.string().required("required"),
  sender: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  reciever: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  proxy: yup
    .string().required("required"),
  message: yup.string().required("Message is required"),
  recieverOperator: yup.string().required("required"),
  operator: yup.string().required("required"),
});

const initialValues = {
  id: "",
  sender: "",
  reciever: "",
  proxy: "",
  message: "",
  recieverOperator: "",
  operator: "",
  status: "active",
};

export default Form;
