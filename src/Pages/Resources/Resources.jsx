import React, { useRef } from "react";
import { FaRegLightbulb, FaTrophy } from "react-icons/fa";
import { IoIosArrowRoundForward } from "react-icons/io";
import { IoColorPaletteOutline, IoTrophyOutline } from "react-icons/io5";
import { LuTrophy } from "react-icons/lu";
import { MdDone } from "react-icons/md";
import { RiNumber1 } from "react-icons/ri";
import { TbNumber1, TbNumber2, TbNumber3, TbNumber4 } from "react-icons/tb";

const Resources = () => {
  const designModalRef = useRef();
  const writingModalRef = useRef();
  const contestModalRef = useRef();
  const PhotographyModalRef = useRef();

  return (
    <div className="min-h-screen max-w-7xl mx-auto">
      <h3 className="text-4xl font-bold text-center mb-3">Learning Hub</h3>
      <p className="text-info-content text-base font-medium text-center">
        Master the skills to create winning submissions
      </p>
      <div className="rounded-2xl bg-linear-65 from-purple-500 to-pink-500 text-white p-8 flex items-start gap-5 mt-5 mx-5">
        <div>
          <FaRegLightbulb className="bg-white/30 p-2 rounded-2xl" size={60} />
        </div>
        <div>
          <h3 className="text-2xl font-bold">Success Starts with Learning</h3>
          <p>
            Explore our comprehensive guides to improve your skills and increase
            your chances of winning. Whether you're a beginner or an expert,
            there's always something new to learn.
          </p>
        </div>
      </div>

      <div className="mx-5 my-10 grid grid-cols-1 gap-8">
        {/* card 1  */}
        <div
          className="p-8 shadow-lg rounded-3xl cursor-pointer"
          onClick={() => designModalRef.current.showModal()}
        >
          <div className="flex items-center gap-5">
            <div className="rounded-2xl bg-linear-65 from-purple-500 to-pink-500 text-white p-2.5">
              <IoColorPaletteOutline size={40} />
            </div>
            <div>
              <h3 className="text-2xl font-bold">Design Best Practices</h3>
              <p className="text-info-content text-base font-medium">
                Essential Principles for creating winning designs
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between mt-3 text-blue-500">
            <span>4 Topics</span>
            <span className="flex items-center gap-2">
              Learn More <IoIosArrowRoundForward size={26} />
            </span>
          </div>
        </div>

        <dialog
          ref={designModalRef}
          className="modal modal-bottom sm:modal-middle"
        >
          <div className="modal-box">
            <div className="space-y-5">
              <div className="bg-[#f9fafb] flex items-start gap-5 p-5 rounded-2xl">
                <div className="rounded-full p-2 bg-linear-65 from-purple-500 to-pink-500 text-white">
                  <TbNumber1 size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">
                    Color Theory Fundamentals
                  </h3>
                  <p className="text-black/50">
                    Understanding color harmony, contrast, and psychology. Use
                    the 60-30-10 rule for balanced compositions. Consider
                    accessibility with proper contrast ratios.
                  </p>
                </div>
              </div>
              <div className="bg-[#f9fafb] flex items-start gap-5 p-5 rounded-2xl">
                <div className="rounded-full p-2 bg-linear-65 from-purple-500 to-pink-500 text-white">
                  <TbNumber2 size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Typography Selection</h3>
                  <p className="text-black/50">
                    Choose fonts that match your message. Limit to 2-3 font
                    families. Ensure readability at all sizes. Consider
                    hierarchy and spacing.
                  </p>
                </div>
              </div>
              <div className="bg-[#f9fafb] flex items-start gap-5 p-5 rounded-2xl">
                <div className="rounded-full p-2 bg-linear-65 from-purple-500 to-pink-500 text-white">
                  <TbNumber3 size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Composition & Layout</h3>
                  <p className="text-black/50">
                    Apply the rule of thirds, golden ratio, and visual balance.
                    Create focal points and guide the viewer's eye through your
                    design.
                  </p>
                </div>
              </div>
              <div className="bg-[#f9fafb] flex items-start gap-5 p-5 rounded-2xl">
                <div className="rounded-full p-2 bg-linear-65 from-purple-500 to-pink-500 text-white">
                  <TbNumber4 size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Design Trends 2025</h3>
                  <p className="text-black/50">
                    Explore glassmorphism, 3D elements, bold typography, and
                    sustainable design principles gaining traction this year.
                  </p>
                </div>
              </div>
            </div>
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
        {/* card 2  */}
        <div className="p-8 shadow-lg rounded-3xl cursor-pointer" onClick={()=>writingModalRef.current.showModal()}>
          <div className="flex items-center gap-5">
            <div className="rounded-2xl bg-linear-65 from-purple-500 to-pink-500 text-white p-2.5">
              <IoColorPaletteOutline size={40} />
            </div>
            <div>
              <h3 className="text-2xl font-bold">Writing Excellence Guide</h3>
              <p className="text-info-content text-base font-medium">
                Craft compelling content that stands out
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between mt-3 text-blue-500">
            <span>4 Topics</span>
            <span className="flex items-center gap-2">
              Learn More <IoIosArrowRoundForward size={26} />
            </span>
          </div>
        </div>
                <dialog
          ref={writingModalRef}
          className="modal modal-bottom sm:modal-middle"
        >
          <div className="modal-box">
            <div className="space-y-5">
              <div className="bg-[#f9fafb] flex items-start gap-5 p-5 rounded-2xl">
                <div className="rounded-full p-2 bg-linear-65 from-purple-500 to-pink-500 text-white">
                  <TbNumber1 size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">
                    Story Structure
                  </h3>
                  <p className="text-black/50">
                    Master the three-act structure, character arcs, and plot development. Create tension and resolution that keeps readers engaged.
                  </p>
                </div>
              </div>
              <div className="bg-[#f9fafb] flex items-start gap-5 p-5 rounded-2xl">
                <div className="rounded-full p-2 bg-linear-65 from-purple-500 to-pink-500 text-white">
                  <TbNumber2 size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Voice & Style</h3>
                  <p className="text-black/50">
                    Develop your unique writing voice. Use active voice, strong verbs, and vivid descriptions. Show, don't tell.
                  </p>
                </div>
              </div>
              <div className="bg-[#f9fafb] flex items-start gap-5 p-5 rounded-2xl">
                <div className="rounded-full p-2 bg-linear-65 from-purple-500 to-pink-500 text-white">
                  <TbNumber3 size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold"> Editing Techniques</h3>
                  <p className="text-black/50">
                    Self-edit effectively by reading aloud, checking for consistency, eliminating redundancy, and polishing your prose.
                  </p>
                </div>
              </div>
              <div className="bg-[#f9fafb] flex items-start gap-5 p-5 rounded-2xl">
                <div className="rounded-full p-2 bg-linear-65 from-purple-500 to-pink-500 text-white">
                  <TbNumber4 size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Hook Your Readers</h3>
                  <p className="text-black/50">
                    Start strong with compelling openings. Use questions, surprising facts, or vivid scenes to capture attention immediately.
                  </p>
                </div>
              </div>
            </div>
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
        {/* card 3  */}
        <div className="p-8 shadow-lg rounded-3xl cursor-pointer" onClick={()=>contestModalRef.current.showModal()}>
          <div className="flex items-center gap-5">
            <div className="rounded-2xl bg-linear-65 from-purple-500 to-pink-500 text-white p-2.5">
              <IoColorPaletteOutline size={40} />
            </div>
            <div>
              <h3 className="text-2xl font-bold">Contest Success Tips</h3>
              <p className="text-info-content text-base font-medium">
                Strategies to maximize your winning potential
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between mt-3 text-blue-500">
            <span>4 Topics</span>
            <span className="flex items-center gap-2">
              Learn More <IoIosArrowRoundForward size={26} />
            </span>
          </div>
        </div>
        <dialog
          ref={contestModalRef}
          className="modal modal-bottom sm:modal-middle"
        >
          <div className="modal-box">
            <div className="space-y-5">
              <div className="bg-[#f9fafb] flex items-start gap-5 p-5 rounded-2xl">
                <div className="rounded-full p-2 bg-linear-65 from-purple-500 to-pink-500 text-white">
                  <TbNumber1 size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">
                    Understanding Briefs
                  </h3>
                  <p className="text-black/50">
                    Read requirements carefully. Identify key objectives and success criteria. Note deadlines and submission formats.
                  </p>
                </div>
              </div>
              <div className="bg-[#f9fafb] flex items-start gap-5 p-5 rounded-2xl">
                <div className="rounded-full p-2 bg-linear-65 from-purple-500 to-pink-500 text-white">
                  <TbNumber2 size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Research & Planning</h3>
                  <p className="text-black/50">
                    Study winning entries from past contests. Analyze what judges value. Create mood boards and outlines before executing.
                  </p>
                </div>
              </div>
              <div className="bg-[#f9fafb] flex items-start gap-5 p-5 rounded-2xl">
                <div className="rounded-full p-2 bg-linear-65 from-purple-500 to-pink-500 text-white">
                  <TbNumber3 size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Time Management</h3>
                  <p className="text-black/50">
                    Break projects into phases. Set internal deadlines. Allow time for revisions. Submit early to avoid technical issues.
                  </p>
                </div>
              </div>
              <div className="bg-[#f9fafb] flex items-start gap-5 p-5 rounded-2xl">
                <div className="rounded-full p-2 bg-linear-65 from-purple-500 to-pink-500 text-white">
                  <TbNumber4 size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Building Your Portfolio</h3>
                  <p className="text-black/50">
                    Even unsuccessful entries build experience. Document your process. Showcase diverse work. Gather testimonials and feedback.
                  </p>
                </div>
              </div>
            </div>
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
        {/* card 4  */}
        <div className="p-8 shadow-lg rounded-3xl cursor-pointer" onClick={()=>PhotographyModalRef.current.showModal()}>
          <div className="flex items-center gap-5">
            <div className="rounded-2xl bg-linear-65 from-purple-500 to-pink-500 text-white p-2.5">
              <IoColorPaletteOutline size={40} />
            </div>
            <div>
              <h3 className="text-2xl font-bold">Photography Mastery</h3>
              <p className="text-info-content text-base font-medium">
                Capture images that tell powerful stories
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between mt-3 text-blue-500">
            <span>4 Topics</span>
            <span className="flex items-center gap-2">
              Learn More <IoIosArrowRoundForward size={26} />
            </span>
          </div>
        </div>
        <dialog
          ref={PhotographyModalRef}
          className="modal modal-bottom sm:modal-middle"
        >
          <div className="modal-box">
            <div className="space-y-5">
              <div className="bg-[#f9fafb] flex items-start gap-5 p-5 rounded-2xl">
                <div className="rounded-full p-2 bg-linear-65 from-purple-500 to-pink-500 text-white">
                  <TbNumber1 size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">
                    Lighting Techniques
                  </h3>
                  <p className="text-black/50">
                    Master natural and artificial lighting. Understand golden hour, blue hour, and harsh midday light. Use shadows creatively.
                  </p>
                </div>
              </div>
              <div className="bg-[#f9fafb] flex items-start gap-5 p-5 rounded-2xl">
                <div className="rounded-full p-2 bg-linear-65 from-purple-500 to-pink-500 text-white">
                  <TbNumber2 size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Composition Rules</h3>
                  <p className="text-black/50">
                    Apply rule of thirds, leading lines, framing, and symmetry. Know when to break rules for impact.
                  </p>
                </div>
              </div>
              <div className="bg-[#f9fafb] flex items-start gap-5 p-5 rounded-2xl">
                <div className="rounded-full p-2 bg-linear-65 from-purple-500 to-pink-500 text-white">
                  <TbNumber3 size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Post-Processing</h3>
                  <p className="text-black/50">
                    Enhance without over-editing. Adjust exposure, contrast, and color grading. Maintain natural aesthetics while perfecting your vision.
                  </p>
                </div>
              </div>
              <div className="bg-[#f9fafb] flex items-start gap-5 p-5 rounded-2xl">
                <div className="rounded-full p-2 bg-linear-65 from-purple-500 to-pink-500 text-white">
                  <TbNumber4 size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Storytelling</h3>
                  <p className="text-black/50">
                    Every photo should tell a story. Consider context, emotion, and narrative. Create series that build compelling visual stories.
                  </p>
                </div>
              </div>
            </div>
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>

      <div className="mx-5 rounded-3xl p-8 my-10 shadow-lg">
        <h3 className="flex items-center gap-3 text-3xl font-bold mb-8">
          <LuTrophy className="text-purple-500" size={30} /> Quick Winning Tips
        </h3>
        <div className="space-y-6">
          {/* card 1  */}

          <div className="flex items-start gap-5">
            <div className="rounded-xl bg-green-100 text-green-500 p-2">
              <MdDone size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold">Read Requirements Carefully</h3>
              <p className="text-black/40 font-medium">
                Missing a key requirement is the #1 reason entries are
                disqualified.
              </p>
            </div>
          </div>
          {/* card 2  */}

          <div className="flex items-start gap-5">
            <div className="rounded-xl bg-blue-100 text-blue-500 p-2">
              <MdDone size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold">Submit Early</h3>
              <p className="text-black/40 font-medium">
                Avoid last-minute technical issues and give yourself buffer
                time.
              </p>
            </div>
          </div>
          {/* card 3  */}

          <div className="flex items-start gap-5">
            <div className="rounded-xl bg-purple-100 text-purple-500 p-2">
              <MdDone size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold">Study Past Winners</h3>
              <p className="text-black/40 font-medium">
                Analyze what makes winning entries stand out from the rest.
              </p>
            </div>
          </div>
          {/* card 4  */}

          <div className="flex items-start gap-5">
            <div className="rounded-xl bg-amber-100 text-amber-500 p-2">
              <MdDone size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold">Get Feedback</h3>
              <p className="text-black/40 font-medium">
                Show your work to others before submitting for valuable
                insights.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;
