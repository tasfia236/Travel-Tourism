
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Form = ({ profile, refetch }) => {
    const axiosSecure = useAxiosSecure();

    const updateProfile = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const image = form.photoURL.value;
        const oldpass = form.oldpass.value;
        const newpass = form.newpass.value;

        const updateProfile = { name, email, image, newpass };
   //     // console.log(updateProfile);
  //      // console.log(oldpass, profile[0]?.password);

        if (oldpass === profile[0]?.password) {
            axiosSecure.patch(`/users/tourGuide/${profile[0]?._id}`, updateProfile)
                .then(res => {
   //                 // console.log(res.data);
                    if (res.data.modifiedCount > 0) {
                        refetch();
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: `Updated ${profile[0]?.name}'s Profile!`,
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                });
        } else {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Old password is incorrect",
            });
        }
    };

    return (
        <div className='p-8'>
            <h1 className="font-black text-3xl text-blue-500 text-center">{profile[0]?.role} Information Form</h1>
            <div className="bg-base-100 shadow-2xl my-12 card lg:card-side">
                <form onSubmit={updateProfile} className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" id="name" name="name" defaultValue={profile[0]?.name} className="px-3 py-2 border rounded-md w-full" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" id="email" name="email" defaultValue={profile[0]?.email} className="px-3 py-2 border rounded-md w-full" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Image URL</span>
                        </label>
                        <input type="text" id="image" name="photoURL" defaultValue={profile[0]?.image} className="px-3 py-2 border rounded-md w-full" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Old Password</span>
                        </label>
                        <input type="password" id="oldpass" name="oldpass" className="px-3 py-2 border rounded-md w-full" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">New Password</span>
                        </label>
                        <input type="password" id="newpass" name="newpass" defaultValue={profile[0]?.password} className="px-3 py-2 border rounded-md w-full" />
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-primary">Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Form;
