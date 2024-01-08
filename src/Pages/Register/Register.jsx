

import Swal from 'sweetalert2';
import { BiShowAlt, BiHide } from "react-icons/bi";

import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import SocialLogin from '../../Components/SocialLogIn/SocialLogin';


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;

const Register = () => {
    const { createUser,  updateUserProfile } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';
   
    const handleSubmit =async (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const image = form?.image?.files[0];

        

        const accepted = event.target.terms.checked;
       

        if (password?.length < 6) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Password should be at least 6 character or longer",
            });

            return;
        } else if (!/[A-Z]/.test(password)) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Your password should have at lest one uppercase characters. ",
            });

            return;
        } else if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password)) {
            Swal.fire({
                icon: "error",
                title: "OOps...",
                text: 'Include at least one special character, such as "@" or "#"',
            });

            return;
        } else if (!accepted) {
            Swal.fire({
                icon: "error",
                title: "Oops..",
                text: "Please Accept Our Terms and Conditions!!",
            });

            return;
        }
        
        const imageData = {image}
        console.log(imageData);
        // const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`
       const res= await axios.post(`https://api.imgbb.com/1/upload?key=${image_hosting_key}`,imageData,{
        headers: {
            'Content-Type': 'multipart/form-data',
          }
          })
          console.log(res);
     
            const imgBbUrl = res?.data?.data?.display_url;
            console.log(imgBbUrl);

           if(res?.data?.success){
            

            createUser(email, password)
            .then((result) => {
                updateUserProfile(name, imgBbUrl)
                .then((res) => {
                   
                   
                       
                           
                                Swal.fire({
                                    icon: "success",
                                    title: "Congrats!!!",
                                    text: "User Created Successfully",
                                });
                                //navigate after register
                                navigate(from, { replace: true });
                         
                      


                });
            })
            .catch((error) => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: `${error?.message}`,
                });
            });
           }
     
          
    
        
    };




    return (
        <div>
            <div className="max-w-screen-xl mx-auto my-20 flex justify-center items-center">
                <div className="w-full max-w-md p-8 space-y-3 rounded-xl dark:bg-gray-900 dark:text-gray-100">
                    <h1 className="text-2xl font-bold text-center">Sign Up</h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-1 text-sm">
                            <label className="block dark:text-gray-400">Name</label>
                            <input
                                type="text"
                                name="name"

                                required
                                id="name" placeholder="name" className="w-full px-4 py-3 rounded-md dark:border-gray-200 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400" />

                        </div>
                        <div className="space-y-1 text-sm">
                            <label className="block dark:text-gray-400">Email</label>
                            <input
                                type="email"
                                name="email"

                                required
                                id="email" placeholder="email" className="w-full px-4 py-3 rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400" />

                        </div>
                        <div className="form-control relative ">
                            <label className="label">
                                <span className="block dark:text-gray-400">Password</span>
                            </label>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="password"
                                className="w-full px-4 py-3 rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-10 focus:dark:border-violet-400"
                                required
                            />
                            <span
                                className=" flex mt-12 mr-2 right-0 justify-end  text-2xl absolute  "
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <BiHide></BiHide> : <BiShowAlt></BiShowAlt>}
                            </span>
                        </div>

                       
                        <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-bold dark:text-gray-400">Image </span>
                </label>
                <input
                  type="file"
                  name="image"
                  required
                  
                />
              </div>
                        <div className="flex gap-2 text-sm mt-5 text-[#706F6F]">
                            <p>
                                <input className="mb-4" type="checkbox" name="terms" id="terms" />
                                <label htmlFor="terms" className="ml-3">
                                    Accept our{" "}
                                    <a className="border-b " href="www.google.com">
                                        Terms and Conditions
                                    </a>
                                </label>
                            </p>
                        </div>

                        <button type="submit" className="block w-full p-3 text-center rounded-sm dark:text-white dark:bg-[#0000FF]">Sign Up</button>
                    </form>

                    <SocialLogin></SocialLogin>
                    <p className="text-xs text-center sm:px-6 dark:text-gray-400">Have an account?
                        <a rel="noopener noreferrer" href="/login" className="underline dark:text-gray-100">Sign in</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;