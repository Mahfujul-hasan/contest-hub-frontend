import { useQuery } from "@tanstack/react-query";
import addContestImg from "../../../assets/create_contest.png";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";

const ContestUpdate = () => {
  const { id } = useParams();
  const navigate=useNavigate();
  const axiosSecure = useAxiosSecure();
  const{register, handleSubmit,formState:{errors}}=useForm()
  const { data: contest, isLoading } = useQuery({
    queryKey: ["contest", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/contests/${id}`);
      return res.data[0];
    },
  });

  if(isLoading){
    return <p>loading...</p>
  }


  const handleUpdateContest=async(data)=>{
    const contestImg=data.contestImage[0]
        const formData = new FormData();
        formData.append("image",contestImg);
        const url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`
        const res= await axios.post(url,formData)
        const contestImage=res.data.data.image.url;
        console.log(contestImage);
        const updatedInfo= {
            contestName:data.contestName,
            contestImage:contestImage,
            contestDescription:data.description,
            entryPrice:data.entryPrice,
            prizeMoney:data.prizeMoney,
            contestType:data.contestType,
            taskInstruction:data.taskInstruction,
            deadline:data.contestDeadline

        }
        axiosSecure.patch(`/contests/${id}`,updatedInfo)
        .then(res=>{
            if(res.data.modifiedCount){
                navigate('/dashboard/my-contests')
                Swal.fire({
                          position: "center",
                          icon: "success",
                          title: "Your contest has been updated!",
                          showConfirmButton: false,
                          timer: 1500,
                        });
            }
            console.log(res.data);
        })

  }
//   console.log(contest);
  return (
    <div className="grid grid-cols-5 items-center  my-10 mx-3 shadow-md border border-gray-200 rounded-3xl">
      <div className="col-span-2 h-full">
        <img src={addContestImg} alt="" className="rounded-l-3xl h-full" />
      </div>
      <div className="col-span-3 rounded-r-3xl p-5">
        <h1 className="text-4xl font-extrabold text-center p-5 text-purple-500">
          Create a contest
        </h1>
        <form onSubmit={handleSubmit(handleUpdateContest)}>
          <fieldset className="fieldset space-y-3">
            {/* creator information  */}
            <div className="grid grid-cols-2 gap-5">
              {/* creator name  */}
              <div>
                <label className="label">Your Name</label>
                <input
                  type="text"
                  className="input w-full"
                  placeholder="Your Name"
                  defaultValue={contest.creatorName}
                  readOnly
                  {...register("creatorName", { required: "Name is required" })}
                />
                {errors.creatorName && (
                  <p className="text-red-500 font-bold">
                    {errors.creatorName.message}
                  </p>
                )}
              </div>

              {/* creator email  */}
              <div>
                <label className="label">Your Email</label>
                <input
                  type="email"
                  className="input w-full"
                  placeholder="Your Email"
                  defaultValue={contest.creatorEmail}
                  readOnly
                  {...register("creatorEmail", {
                    required: "Email is required",
                  })}
                />
                {errors.creatorEmail && (
                  <p className="text-red-500 font-bold">
                    {errors.creatorEmail.message}
                  </p>
                )}
              </div>
            </div>

            {/* contest name and image  */}
            <div className="grid grid-cols-2 gap-5">
              <div>
                {/* contest name  */}
                <label className="label">Contest Name</label>
                <input
                  type="text"
                  className="input w-full"
                  placeholder="Contest Name"
                  defaultValue={contest.contestName}
                  {...register("contestName", {
                    required: "Contest Name is required",
                  })}
                />
                {errors.contestName && (
                  <p className="text-red-500 font-bold">
                    {errors.contestName.message}
                  </p>
                )}
              </div>

              <div>
                {/* contest image  */}
                <label className="label">Contest Image</label>
                <input
                  type="file"
                  className="file-input file-input-ghost w-full"
                  {...register("contestImage", {
                    required: "Contest Image is required",
                  })}
                />
                {errors.contestImage && (
                  <p className="text-red-500 font-bold">
                    {errors.contestImage.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div>
                {/* contest entry price  */}
                <label className="label">Entry Price</label>
                <input
                  type="text"
                  className="input"
                  placeholder="Set Entry Price"
                  defaultValue={contest.entryPrice}
                  {...register("entryPrice", {
                    required: "Entry price is required",
                  })}
                />
                {errors.entryPrice && (
                  <p className="text-red-500 font-bold">
                    {errors.entryPrice.message}
                  </p>
                )}
              </div>
              <div>
                {/* contest prize money  */}
                <label className="label">Prize Money</label>
                <input
                  type="text"
                  className="input"
                  placeholder="Set Prize money"
                  defaultValue={contest.prizeMoney}
                  {...register("prizeMoney", {
                    required: "Prize money is required",
                  })}
                />
                {errors.prizeMoney && (
                  <p className="text-red-500 font-bold">
                    {errors.prizeMoney.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div>
                {/* contest type  */}
                <label className="label">Contest Type</label>
                <input
                  type="text"
                  className="input"
                  placeholder="Set Contest Type"
                  defaultValue={contest.contestType}
                  {...register("contestType", {
                    required: "Contest type is required",
                  })}
                />
                {errors.contestType && (
                  <p className="text-red-500 font-bold">
                    {errors.contestType.message}
                  </p>
                )}
              </div>
              <div>
                {/* contest deadline  */}
                <label className="label">Contest Type</label>
                <input
                  type="datetime-local"
                  className="input"
                  defaultValue={contest.deadline}
                  {...register("contestDeadline", {
                    required: "Contest Deadline is required",
                  })}
                />
                {errors.contestDeadline && (
                  <p className="text-red-500 font-bold">
                    {errors.contestDeadline.message}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div>
                {/* contest description  */}
                <label className="label">Contest Description</label>
                <textarea
                  className="textarea"
                  placeholder="Add contest description"
                  defaultValue={contest.contestDescription}
                  {...register("description", {
                    required: "Contest Description is required",
                  })}
                ></textarea>
                {errors.description && (
                  <p className="text-red-500 font-bold">
                    {errors.description.message}
                  </p>
                )}
              </div>
              <div>
                {/* contest task instruction  */}
                <label className="label">Task Instruction</label>
                <textarea
                  className="textarea"
                  placeholder="Add instruction"
                  defaultValue={contest.taskInstruction}
                  {...register("taskInstruction", {
                    required: "Task instruction is required",
                  })}
                ></textarea>
                {errors.taskInstruction && (
                  <p className="text-red-500 font-bold">
                    {errors.taskInstruction.message}
                  </p>
                )}
              </div>
            </div>

            <button className="btn bg-purple-500 text-white text-lg rounded-3xl">
              Update Now
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default ContestUpdate;
