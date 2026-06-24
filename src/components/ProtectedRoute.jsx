import React from "react";
import {
  Navigate,
  useLocation
} from "react-router-dom";

const ProtectedRoute = ({
  children,
  allowedRoles = []
}) => {

  const location =
    useLocation();

  const storedUser =
    localStorage.getItem("user");

  let user = null;

  try {

    user =
      storedUser
        ? JSON.parse(storedUser)
        : null;

  } catch (error) {

    console.error(
      "Invalid user data in localStorage"
    );

  }

  console.log(
    "=============================="
  );

  console.log(
    "🔒 Protected Route Check"
  );

  console.log(
    "📍 Current Path:",
    location.pathname
  );

  console.log(
    "👤 User:",
    user
  );

  console.log(
    "🎭 Allowed Roles:",
    allowedRoles
  );

  console.log(
    "=============================="
  );

  // Not logged in
  if (!user) {

    console.log(
      "❌ No user found"
    );

    return (
      <Navigate
        to="/login"
        state={{
          from: location
        }}
        replace
      />
    );

  }

  const userRole =
    (
      user.role ||
      ""
    )
      .toString()
      .toLowerCase()
      .trim();

  const normalizedAllowed =
    allowedRoles.map(
      role =>
        role
          .toLowerCase()
          .trim()
    );

  console.log(
    "👤 User Role:",
    userRole
  );

  const hasAccess =
    normalizedAllowed.includes(
      userRole
    );

  console.log(
    "✅ Access:",
    hasAccess
  );

  if (
    allowedRoles.length > 0 &&
    !hasAccess
  ) {

    console.error(
      "🚫 Access Denied"
    );

    console.error(
      "User Role:",
      userRole
    );

    console.error(
      "Required:",
      normalizedAllowed
    );

    return (
      <Navigate
        to="/"
        replace
      />
    );

  }

  return children;

};

export default ProtectedRoute;

