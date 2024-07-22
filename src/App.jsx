//import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout.jsx";
import { UserContextProvider } from "./UserContext.jsx";
import BookingPage from "./pages/BookingPage.jsx";
import BookingsPage from "./pages/BookingsPage.jsx";
import IndexPage from "./pages/IndexPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import PlacePage from "./pages/PlacePage.jsx";
import PlacesFormPage from "./pages/PlacesFormPage.jsx";
import PlacesPage from "./pages/PlacesPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";

axios.defaults.baseURL = "http://localhost:5007";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout></Layout>}>
          <Route index element={<IndexPage></IndexPage>}></Route>
          <Route path="/login" element={<LoginPage></LoginPage>}></Route>
          <Route
            path="/register"
            element={<RegisterPage></RegisterPage>}
          ></Route>
          <Route path="/account" element={<ProfilePage></ProfilePage>}></Route>
          <Route
            path="/account/places"
            element={<PlacesPage></PlacesPage>}
          ></Route>
          <Route
            path="/account/places/new"
            element={<PlacesFormPage></PlacesFormPage>}
          ></Route>
          <Route
            path="/account/places/:id"
            element={<PlacesFormPage></PlacesFormPage>}
          ></Route>
          <Route path="/places/:id" element={<PlacePage></PlacePage>}></Route>

          <Route
            path="/account/bookings"
            element={<BookingsPage></BookingsPage>}
          ></Route>
          <Route
            path="/account/bookings/:id"
            element={<BookingPage></BookingPage>}
          ></Route>
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
