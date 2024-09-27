"use client";
import React, { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useParams } from "next/navigation";
import courses from "@/store/courses.json";
import { Button } from "@/components/ui/button";
import { FaComment, FaHeart, FaShare } from "react-icons/fa";



interface Lesson {
  id: string;
  title: string;
  description: string;
  video_id: string;
  video_url: string;
  video_duration: string;
  thumbnailUrl: string;
  comments: { id: string; author: string; content: string }[];
}


const LessonId = () => {
  const { courseId, topicId, lessonId } = useParams();
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);

  useEffect(() => {
    const Course = courses.find((course) => course.id === courseId);
    const Topic = Course?.topics.find((topic) => topic.id === topicId);
    const Lesson = Topic?.lessons.find((lesson) => lesson.id === lessonId);
    setCurrentLesson(Lesson || null);

  }, [courseId, topicId, lessonId]);
  return (
    <>
      <div className="flex flex-row h-full p-2">
        <div className="flex flex-col items-center w-full">
          <h1 className="text-2xl font-bold text-center py-2">{currentLesson?.title}</h1>
          <video
            src={currentLesson?.video_url}
            controls
            autoPlay
            className="rounded-xl shadow-xl"
          />
          <div className="flex flex-row justify-center items-center w-full py-2">
            <Button variant="default" size="sm">
              Dersi tamamlandı olarak Kaydet
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LessonId;
