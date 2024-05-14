import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Card,
  FormHelperText,
} from "@mui/material";
import {
  TextFieldWrapper,
} from "components/authentication/StyledComponents";
import FlexBox from "components/FlexBox";
import LightTextField from "components/LightTextField";
import { H1, Paragraph, Small } from "components/Typography";
import { useFormik } from "formik";
import useAuth from "hooks/useAuth";
import { FC, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";

const Login: FC = () => {
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
    submit: null,
    remember: true,
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Must be a valid email")
      .max(255)
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password should be of minimum 6 characters length")
      .required("Password is required"),
  });

  const { errors, values, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: (values: any) => {
        setLoading(true);
        login(values.email, values.password)
          .then(() => {
            setLoading(false);
            toast.success("You Logged In Successfully");
            navigate("/dashboard");
          })
          .catch((error) => {
            setError(error.message);
            setLoading(false);
          });
      },
    });

  return (
    <FlexBox
      sx={{
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        height: { sm: "100%" },
      }}
    >
      <Card sx={{ padding: 4, maxWidth: 600, boxShadow: 20 }}>
        <FlexBox
          alignItems="center"
          flexDirection="column"
          justifyContent="center"
          mb={5}
        >
          <Box width={38} mb={1}>
            <img src="/static/logo/logo.svg" width="100%" alt="Uko Logo" />
          </Box>
          <H1 fontSize={24} fontWeight={700}>
            Sign In to Budget Planner
          </H1>
        </FlexBox>

        <FlexBox justifyContent="space-between" flexWrap="wrap" my="1rem">
          
          <form noValidate onSubmit={handleSubmit} style={{ width: "100%" }}>
            <FlexBox justifyContent="space-between" flexWrap="wrap">
              <TextFieldWrapper>
                <Paragraph fontWeight={600} mb={1}>
                  Email
                </Paragraph>
                <LightTextField
                  fullWidth
                  name="email"
                  type="email"
                  placeholder="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email || ""}
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                />
              </TextFieldWrapper>

              <TextFieldWrapper>
                <Paragraph fontWeight={600} mb={1}>
                  Password
                </Paragraph>
                <LightTextField
                  fullWidth
                  name="password"
                  type="password"
                  placeholder="Password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password || ""}
                  error={Boolean(touched.password && errors.password)}
                  helperText={touched.password && errors.password}
                />
              </TextFieldWrapper>
            </FlexBox>

            {error && (
              <FormHelperText
                error
                sx={{
                  mt: 2,
                  fontSize: 13,
                  fontWeight: 500,
                  textAlign: "center",
                }}
              >
                {error}
              </FormHelperText>
            )}

            <Box sx={{ mt: 4 }}>
              {loading ? (
                <LoadingButton loading fullWidth variant="contained">
                  Sign In
                </LoadingButton>
              ) : (
                <Button fullWidth type="submit" variant="contained">
                  Sign In
                </Button>
              )}
            </Box>
          </form>

          <Small margin="auto" mt={3} color="text.disabled">
            Don't have an account?{" "}
            <Link to="/register">
              <Small color="primary.main">Create an account</Small>
            </Link>
          </Small>
        </FlexBox>
      </Card>
    </FlexBox>
  );
};

export default Login;
