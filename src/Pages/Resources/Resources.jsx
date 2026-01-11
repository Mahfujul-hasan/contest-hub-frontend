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
    <div className="min-h-screen max-w-[1440px] mx-auto my-10">
      <h3 className="text-4xl font-bold text-center mb-3 text-primary">
        Learning Hub
      </h3>
      <p className="text-base-content/70 text-base font-medium text-center">
        Master the skills to create winning submissions
      </p>
      <div className="rounded-md bg-linear-65 from-purple-500 to-pink-500 text-white p-8 flex items-start gap-5 mt-5 mx-4 lg:mx-10">
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

      <div className="mx-4 lg:mx-10 my-10 grid grid-cols-1 gap-8">
        {/* card 1  */}
        <div
          className="p-8 shadow-md rounded-md bg-base-200 cursor-pointer hover:shadow-lg"
          onClick={() => designModalRef.current.showModal()}
        >
          <div className="flex items-center gap-5">
            <div className="rounded-2xl bg-linear-65 from-purple-500 to-pink-500 text-white p-2.5">
              <IoColorPaletteOutline size={40} />
            </div>
            <div>
              <h3 className="text-2xl font-bold">Design Best Practices</h3>
              <p className="text-base-content/70 text-base font-medium">
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
              <div className="bg-base-200 flex items-start gap-5 p-5 rounded-2xl">
                <div className="rounded-full p-2 bg-linear-65 from-purple-500 to-pink-500 text-white">
                  <TbNumber1 size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">
                    Color Theory Fundamentals
                  </h3>
                  <p className="text-base-content/70">
                    Understanding color harmony, contrast, and psychology. Use
                    the 60-30-10 rule for balanced compositions. Consider
                    accessibility with proper contrast ratios.
                  </p>
                </div>
              </div>

              <div className="bg-base-200 flex items-start gap-5 p-5 rounded-2xl">
                <div className="rounded-full p-2 bg-linear-65 from-purple-500 to-pink-500 text-white">
                  <TbNumber2 size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Typography Selection</h3>
                  <p className="text-base-content/70">
                    Choose fonts that match your message. Limit to 2–3 font
                    families. Ensure readability and clear hierarchy.
                  </p>
                </div>
              </div>

              <div className="bg-base-200 flex items-start gap-5 p-5 rounded-2xl">
                <div className="rounded-full p-2 bg-linear-65 from-purple-500 to-pink-500 text-white">
                  <TbNumber3 size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Composition & Layout</h3>
                  <p className="text-base-content/70">
                    Apply rule of thirds, golden ratio, and visual balance to
                    guide user attention effectively.
                  </p>
                </div>
              </div>

              <div className="bg-base-200 flex items-start gap-5 p-5 rounded-2xl">
                <div className="rounded-full p-2 bg-linear-65 from-purple-500 to-pink-500 text-white">
                  <TbNumber4 size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Design Trends 2025</h3>
                  <p className="text-base-content/70">
                    Explore glassmorphism, 3D elements, bold typography, and
                    sustainable design trends.
                  </p>
                </div>
              </div>
            </div>

            <div className="modal-action">
              <form method="dialog">
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>

        {/* card 2  */}
        <div
          className="p-8 shadow-md rounded-md bg-base-200 cursor-pointer hover:shadow-lg"
          onClick={() => writingModalRef.current.showModal()}
        >
          <div className="flex items-center gap-5">
            <div className="rounded-2xl bg-linear-65 from-purple-500 to-pink-500 text-white p-2.5">
              <IoColorPaletteOutline size={40} />
            </div>
            <div>
              <h3 className="text-2xl font-bold">Writing Excellence Guide</h3>
              <p className="text-base-content/70 text-base font-medium">
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
              <div className="bg-base-200 flex items-start gap-5 p-5 rounded-2xl">
                <div className="rounded-full p-2 bg-linear-65 from-purple-500 to-pink-500 text-white">
                  <TbNumber1 size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Story Structure</h3>
                  <p className="text-base-content/70">
                    Master three-act structure, character arcs, and narrative
                    tension to keep readers engaged.
                  </p>
                </div>
              </div>

              <div className="bg-base-200 flex items-start gap-5 p-5 rounded-2xl">
                <div className="rounded-full p-2 bg-linear-65 from-purple-500 to-pink-500 text-white">
                  <TbNumber2 size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Voice & Style</h3>
                  <p className="text-base-content/70">
                    Develop a unique writing voice using active verbs, clarity,
                    and strong imagery.
                  </p>
                </div>
              </div>

              <div className="bg-base-200 flex items-start gap-5 p-5 rounded-2xl">
                <div className="rounded-full p-2 bg-linear-65 from-purple-500 to-pink-500 text-white">
                  <TbNumber3 size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Editing Techniques</h3>
                  <p className="text-base-content/70">
                    Improve clarity by reading aloud, removing redundancy, and
                    tightening prose.
                  </p>
                </div>
              </div>

              <div className="bg-base-200 flex items-start gap-5 p-5 rounded-2xl">
                <div className="rounded-full p-2 bg-linear-65 from-purple-500 to-pink-500 text-white">
                  <TbNumber4 size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Hook Your Readers</h3>
                  <p className="text-base-content/70">
                    Capture attention with compelling openings, questions, or
                    vivid storytelling.
                  </p>
                </div>
              </div>
            </div>

            <div className="modal-action">
              <form method="dialog">
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>

        {/* card 3  */}
        <div
          className="p-8 shadow-md rounded-md bg-base-200 cursor-pointer hover:shadow-lg"
          onClick={() => contestModalRef.current.showModal()}
        >
          <div className="flex items-center gap-5">
            <div className="rounded-2xl bg-linear-65 from-purple-500 to-pink-500 text-white p-2.5">
              <IoColorPaletteOutline size={40} />
            </div>
            <div>
              <h3 className="text-2xl font-bold">Contest Success Tips</h3>
              <p className="text-base-content/70 text-base font-medium">
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
              <div className="bg-base-200 flex items-start gap-5 p-5 rounded-2xl">
                <div className="rounded-full p-2 bg-linear-65 from-purple-500 to-pink-500 text-white">
                  <TbNumber1 size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Understanding Briefs</h3>
                  <p className="text-base-content/70">
                    Carefully read requirements, objectives, deadlines, and
                    submission rules.
                  </p>
                </div>
              </div>

              <div className="bg-base-200 flex items-start gap-5 p-5 rounded-2xl">
                <div className="rounded-full p-2 bg-linear-65 from-purple-500 to-pink-500 text-white">
                  <TbNumber2 size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Research & Planning</h3>
                  <p className="text-base-content/70">
                    Study winning entries, analyze judges’ expectations, and
                    plan before execution.
                  </p>
                </div>
              </div>

              <div className="bg-base-200 flex items-start gap-5 p-5 rounded-2xl">
                <div className="rounded-full p-2 bg-linear-65 from-purple-500 to-pink-500 text-white">
                  <TbNumber3 size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Time Management</h3>
                  <p className="text-base-content/70">
                    Break work into phases, set deadlines, and submit early to
                    avoid issues.
                  </p>
                </div>
              </div>

              <div className="bg-base-200 flex items-start gap-5 p-5 rounded-2xl">
                <div className="rounded-full p-2 bg-linear-65 from-purple-500 to-pink-500 text-white">
                  <TbNumber4 size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Building Your Portfolio</h3>
                  <p className="text-base-content/70">
                    Document your process, showcase variety, and turn feedback
                    into growth.
                  </p>
                </div>
              </div>
            </div>

            <div className="modal-action">
              <form method="dialog">
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>

        {/* card 4  */}
        <div
          className="p-8 shadow-md rounded-md bg-base-200 cursor-pointer hover:shadow-lg"
          onClick={() => PhotographyModalRef.current.showModal()}
        >
          <div className="flex items-center gap-5">
            <div className="rounded-2xl bg-linear-65 from-purple-500 to-pink-500 text-white p-2.5">
              <IoColorPaletteOutline size={40} />
            </div>
            <div>
              <h3 className="text-2xl font-bold">Photography Mastery</h3>
              <p className="text-base-content/70 text-base font-medium">
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
              <div className="bg-base-200 flex items-start gap-5 p-5 rounded-2xl">
                <div className="rounded-full p-2 bg-linear-65 from-purple-500 to-pink-500 text-white">
                  <TbNumber1 size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Lighting Techniques</h3>
                  <p className="text-base-content/70">
                    Master natural and artificial lighting. Understand golden
                    hour, blue hour, and harsh midday light. Use shadows
                    creatively.
                  </p>
                </div>
              </div>
              <div className="bg-base-200 flex items-start gap-5 p-5 rounded-2xl">
                <div className="rounded-full p-2 bg-linear-65 from-purple-500 to-pink-500 text-white">
                  <TbNumber2 size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Composition Rules</h3>
                  <p className="text-base-content/70">
                    Apply rule of thirds, leading lines, framing, and symmetry.
                    Know when to break rules for impact.
                  </p>
                </div>
              </div>
              <div className="bg-base-200 flex items-start gap-5 p-5 rounded-2xl">
                <div className="rounded-full p-2 bg-linear-65 from-purple-500 to-pink-500 text-white">
                  <TbNumber3 size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Post-Processing</h3>
                  <p className="text-base-content/70">
                    Enhance without over-editing. Adjust exposure, contrast, and
                    color grading. Maintain natural aesthetics while perfecting
                    your vision.
                  </p>
                </div>
              </div>
              <div className="bg-base-200 flex items-start gap-5 p-5 rounded-2xl">
                <div className="rounded-full p-2 bg-linear-65 from-purple-500 to-pink-500 text-white">
                  <TbNumber4 size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Storytelling</h3>
                  <p className="text-base-content/70">
                    Every photo should tell a story. Consider context, emotion,
                    and narrative. Create series that build compelling visual
                    stories.
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

      <div className="mx-4 lg:mx-10 rounded-md p-8 my-10 shadow-md hover:shadow-lg bg-base-200">
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
              <p className="text-base-content/70 font-medium">
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
              <p className="text-base-content/70 font-medium">
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
              <p className="text-base-content/70 font-medium">
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
              <p className="text-base-content/70 font-medium">
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
