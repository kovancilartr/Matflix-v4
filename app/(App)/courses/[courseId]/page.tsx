"use client";
import { useParams, usePathname } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import courses from "@/store/courses.json";
import Link from "next/link";
import { FaYoutube } from "react-icons/fa";
import { Button } from "@/components/ui/button";

const CourseDetailPage = () => {
  // Kurs detay sayfasındaki id değişkenini al
  const { courseId } = useParams();

  const currentCourse = courses.find(
    (course) => course.id.toString() === courseId.toString()
  );

  return (
    <div className="flex flex-col">
      <div className="flex flex-row p-2 gap-4">
        <div className="w-3/5">
          <video
            src={currentCourse?.courseVideoUrl}
            controls
            className="w-full h-96 object-cover rounded-xl"
          ></video>
        </div>
        <div className="flex flex-col justify-center items-center w-2/5 border-2 border-gray-200 rounded-xl shadow-lg">
          <p className="text-2xl font-bold">{currentCourse?.title}</p>
          <p className="text-lg text-center">{currentCourse?.description}</p>
          <div className="flex flex-col items-center justify-center mt-4 border-t-2 border-gray-100 ">
            <p className="text-sm font-bold">
              Kategori:{" "}
              <span className="text-red-500 text-lg">
                {currentCourse?.category}
              </span>
            </p>
            <p className="text-sm font-bold">
              Toplam Süre:{" "}
              <span className="text-red-500 text-lg">
                {currentCourse?.duration}
              </span>
            </p>
            <p className="text-sm font-bold">
              Oluşturan:{" "}
              <span className="text-red-500 text-lg">
                {currentCourse?.instructor}
              </span>
            </p>
            <div className="flex flex-row items-center justify-center gap-x-4">
              <p className="text-sm font-bold">
                Puan:
                <span className="text-red-500 text-lg">
                  {currentCourse?.rating}
                </span>
              </p>
              <p className="text-sm font-bold">
                Ücret:
                <span className="text-red-500 text-lg">
                  {currentCourse?.price}
                </span>
              </p>
            </div>
          </div>

          {/* Video Buttons */}
          <Button
            variant="default"
            className="w-3/5 mt-2 text-center"
            onClick={() => console.log("Kursa Kaydolundu")}
          >
            Kursa Kaydol
          </Button>
        </div>
      </div>

      <div className="flex flex-col m-4 gap-2 border-2 border-gray-200 rounded-xl shadow-lg">
        {/* Lesson List */}
        {currentCourse?.topics?.map((topic) => (
          <Accordion type="multiple" className="w-full p-2">
            <AccordionItem value={topic.id.toString()}>
              <AccordionTrigger className="hover:no-underline">
                TOPİC : {topic.title}
              </AccordionTrigger>
              <AccordionContent>
                {topic.lessons.map((lesson) => (
                  <Link
                    key={lesson.id}
                    href={`/courses/${currentCourse?.id}/topics/${topic.id}/lessons/${lesson.id}`}
                  >
                    <div className="flex flex-row justify-between items-center p-2 hover:no-underline">
                      <div className="flex hover:scale-105 transition">
                        <p className="flex flex-row justify-center items-center gap-1 text-lg font-semibold">
                          <span className="text-sm">{lesson.video_id} - </span>
                          <FaYoutube className="h-4 w-4" />
                          {lesson.title}
                        </p>
                        <p className="text-[12px] text-red-800 p-2">
                          {lesson.video_duration}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">
                          {lesson.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

export default CourseDetailPage;
