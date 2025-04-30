import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";
import { Divider } from "@heroui/divider";
import { Spinner } from "@heroui/spinner";
import DefaultLayout from "../layouts/default";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        
        if (!token) {
          throw new Error("No authentication token found");
        }

        const response = await fetch("http://localhost:5000/api/users/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user profile");
        }

        const userData = await response.json();
        setUser(userData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  // Generate initials for avatar
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Spinner size="lg" color="primary" />
      </div>
    );
  }

  if (error) {
    return (
      <Card className="max-w-md mx-auto mt-10">
        <CardBody>
          <div className="text-center text-danger">
            <p className="text-xl font-semibold">Error</p>
            <p>{error}</p>
            <Button 
              color="primary" 
              className="mt-4" 
              onClick={() => window.location.href = "/"}
            >
              Return to Login
            </Button>
          </div>
        </CardBody>
      </Card>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <DefaultLayout>
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">User Profile</h1>
      
      <Card className="max-w-md mx-auto">
        <CardHeader className="flex gap-3 justify-center items-center flex-col pt-8 pb-4">
          <Avatar 
            size="lg" 
            name={getInitials(user.name)} 
            color="primary"
            className="w-24 h-24 text-2xl"
          />
          <div className="flex flex-col items-center">
            <p className="text-xl font-bold">{user.name}</p>
            <p className="text-small text-default-500">{user.email}</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <div className="space-y-4">
            <div>
              <h3 className="text-md font-semibold text-default-600">Account Details</h3>
              <div className="mt-2 space-y-2">
                <div className="flex justify-between">
                  <span className="text-default-500">User ID</span>
                  <span className="font-medium">{user._id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-default-500">Account Created</span>
                  <span className="font-medium">
                    {user.createdAt 
                      ? new Date(user.createdAt).toLocaleDateString() 
                      : "N/A"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-default-500">Last Updated</span>
                  <span className="font-medium">
                    {user.updatedAt 
                      ? new Date(user.updatedAt).toLocaleDateString() 
                      : "N/A"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardBody>
        <Divider />
        <CardFooter className="flex justify-center gap-2">
          <Button color="primary" variant="flat">
            Edit Profile
          </Button>
          <Button color="danger" variant="light">
            Delete Account
          </Button>
        </CardFooter>
      </Card>
    </div>
    </DefaultLayout>
  );
};

export default UserProfile;