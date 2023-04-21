import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context";
import { useRouter } from "next/router";

function Nav() {
  const [state, setState] = useContext(UserContext);
  const [currentPage, setCurrentPage] = useState("");

  const router = useRouter();

  useEffect(() => {
    process.browser && setCurrentPage(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  const logout = () => {
    window.localStorage.removeItem("auth");
    setState(null);
    router.push("/login");
  };

  return (
    <>
      <ul className="nav justify-content-center">
        <li className="nav-item">
          <Link href="/" className="nav-link logo">
            FaceDook
          </Link>
        </li>

        {state !== null ? (
          <>
            <div className="dropdown mt-1">
              <button
                className="btn btn-sm dropdown-toggle border-0"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <h6 className="ichigo">Hi, {state && state.user && state.user.name} </h6>
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton1"
              >
                <li className="nav-item dropdown-item">
                  <Link
                    href="/user/dashboard"
                    className={`nav-link ${
                      currentPage === "/user/dashboard" && "active"
                    }`}
                  >
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item dropdown-item">
                  <Link
                    href="/user/profile/update"
                    className={`nav-link ${
                      currentPage === "/user/profile/update" && "active"
                    }`}
                  >
                    Profile
                  </Link>
                </li>

                {state.user.role === "Admin" && (
                    <li className="nav-item dropdown-item">
                      <Link
                        href="/admin/"
                        className={`nav-link ${
                          currentPage === "/admin" && "active"
                        }`}
                      >
                        Admin
                      </Link>
                  </li>
                )}

                <li className="nav-item dropdown-item">
                  <a onClick={logout} className={`nav-link`}>
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <>
            <li className="nav-item">
              <Link
                href="/login"
                className={`nav-link ${currentPage === "/login" && "active"}`}
              >
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link
                href="/register"
                className={`nav-link ${
                  currentPage === "/register" && "active"
                }`}
              >
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </>
  );
}

export default Nav;
