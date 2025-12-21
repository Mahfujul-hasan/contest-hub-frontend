import { useQuery } from "@tanstack/react-query";
import React, { useRef } from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import Swal from "sweetalert2";
import Spinner from "../../../components/Spinner/Spinner";

const SeeSubmissions = () => {
  const { id: contestId } = useParams();
  const submissionModalRef = useRef();
  const axiosSecure = useAxiosSecure();
  const { data: submissions, isLoading:submissionLoading, refetch = [] } = useQuery({
    queryKey: ["submissions", contestId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/submissions?contestId=${contestId}`);
      return res.data;
    },
  });
  if(submissionLoading){
    return <Spinner />
  }

  const winnerDeclared=submissions.filter(submission=>(submission.isWinner==="winner"))


  const handleWinner = async(submission) => {
    Swal.fire({
  title: "Are you sure to declare winner?",

  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, making winner",
  cancelButtonText:"No"
}).then(async(result) => {
  if (result.isConfirmed) {
    const res= await axiosSecure.patch(`/submissions/${submission._id}`)
    if(res.data.success){
      refetch()
      Swal.fire({
      title: `${submission.userName} is win the contest`,
      text: "Your file has been deleted.",
      icon: "success"
    });

    }
    
  }
});
    
    
  };

  const handleSubmissionModal = () => {
    submissionModalRef.current.showModal();
  };
  return (
    <div>
      <h3 className="text-3xl font-bold text-center text-purple-500">
        See all submissions of the contest
      </h3>
      <div className="overflow-x-auto border-2 border-purple-200 rounded-3xl my-5 min-h-screen">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Participator image</th>
              <th>Participator Name</th>
              <th>Contest Name</th>
              <th>Contest Deadline</th>
              <th>Winning status</th>
              <th>Actions</th>
              <th>Submission details</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((submission, index) => (
              <tr key={submission._id}>
                <th>{index + 1}</th>
                <td>
                  {" "}
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src={submission.userPhoto}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                </td>
                <td>{submission.userName}</td>
                <td>{submission.contestName}</td>
                <td>{new Date(submission.contestDeadline).toLocaleString()}</td>
                <td className={submission.isWinner==="pending"?"text-red-400":"text-green-500"}>{submission.isWinner}</td>
                <td>
                  
                  
                      <button
                        onClick={() => handleWinner(submission)}
                        disabled={winnerDeclared.length>0}
                        className="btn rounded-full bg-green-200 text-green-700"
                      >
                        Declare Winner
                      </button>
                   
                </td>
                <td>
                  <button className="btn rounded-full bg-purple-200 text-purple-700" onClick={handleSubmissionModal}>
                    Submission
                  </button>
                  <dialog
                    ref={submissionModalRef}
                    className="modal modal-bottom sm:modal-middle"
                  >
                    <div className="modal-box">
                      <h3 className="font-bold text-lg text-center text-purple-500">
                        {submission.contestName}
                      </h3>
                      <p className="py-2">
                        <span className="font-bold">Participator Name:</span> {submission.userName}
                      </p>
                      <p className="py-2">
                        <span className="font-bold">Participator Email:</span> {submission.userEmail}
                      </p>
                      <p className="py-2 ">
                        <span className="font-bold">Submitted Task:</span> <span className="link text-blue-500">{submission.submissionLink
}</span>
                      </p>
                      <p className="py-2">
                        <span className="font-bold">Submitted At:</span> {new Date(submission.submittedAt).toLocaleString()}
                      </p>

                      <div className="modal-action">
                        <form method="dialog">
                          {/* if there is a button in form, it will close the modal */}
                          <button className="btn">Close</button>
                        </form>
                      </div>
                    </div>
                  </dialog>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SeeSubmissions;
