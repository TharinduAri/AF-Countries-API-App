import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Link } from "@heroui/link";
import { Button } from "@heroui/button";
import { ThemeSwitch } from "@/components/theme-switch";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in by looking for token in localStorage
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    // Clear token and any other user data from localStorage
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/"); // Redirect to login page
  };

  return (
    <HeroUINavbar maxWidth="xl" position="sticky">
      {/* Website name on the left */}
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="gap-3 max-w-fit">
          <Link
            className="flex justify-start items-center gap-1"
            color="foreground"
            href=""
          >
            <p className="font-bold text-inherit">World Wanderer</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      {/* Navigation items on the right for desktop */}
      
      <NavbarContent className="hidden sm:flex basis-1/5 sm:basis-full" justify="end">
        {isLoggedIn && (
          <NavbarItem>
            <Button as={Link} color="primary" href="/home" variant="light">
              Home
            </Button>
          </NavbarItem>
        )}
        
        {isLoggedIn ? (
          // Show logout button if logged in
          <NavbarItem>
            <Button color="danger" onClick={handleLogout} variant="light">
              Logout
            </Button>
            <Button as={Link} color="primary" href="/profile">Profile</Button>
          </NavbarItem>
          
        ) : (
          // Show login and register if not logged in
          <>
            <NavbarItem>
              <Button as={Link} color="primary" href="/" variant="light">
                Login
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button as={Link} color="primary" href="/register" variant="flat">
                Register
              </Button>
            </NavbarItem>
          </>
        )}
        
        <NavbarItem>
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>

      {/* Mobile menu toggle */}
      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      {/* Mobile menu */}
      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {isLoggedIn && (
            <NavbarMenuItem>
              <Link color="foreground" href="/home" size="lg">
                Home
              </Link>
            </NavbarMenuItem>
          )}
          
          {isLoggedIn ? (
            // Show logout button if logged in
            <>
            <NavbarMenuItem>
              <Link color="danger" href="#" size="lg" onClick={handleLogout}>
                Logout
              </Link>
            </NavbarMenuItem>
            <NavbarMenuItem>
                <Link color="foreground" href="/profile" size="lg">
                  Profile
                </Link>
              </NavbarMenuItem>

            </>
            
          ) : (
            // Show login and register if not logged in
            <>
              <NavbarMenuItem>
                <Link color="foreground" href="/" size="lg">
                  Login
                </Link>
              </NavbarMenuItem>
              <NavbarMenuItem>
                <Link color="primary" href="/register" size="lg">
                  Register
                </Link>
              </NavbarMenuItem>
            </>
          )}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
