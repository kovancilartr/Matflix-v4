"use client";
import Sidebar from "@/components/(App)/Sidebar";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaBook, FaUser, FaHeart, FaBell, FaCog, FaToggleOn, FaToggleOff, FaAngleRight, FaAngleDown } from "react-icons/fa";
import courses from "@/store/courses.json";
import { Button } from "@/components/ui/button";

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

export default function CourseDetailLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { courseId, topicId, lessonId } = useParams();
  const router = useRouter();
  const [currentCourse, setCurrentCourse] = useState<any>(null);
  const [currentTopic, setCurrentTopic] = useState<any>(null);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [navItems, setNavItems] = useState<any[]>([]);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  useEffect(() => {
    const Course = courses.find((course) => course.id === courseId);
    const Topic = Course?.topics.find((topic) => topic.id === topicId);
    const Lesson = Topic?.lessons.find((lesson) => lesson.id === lessonId);

    setCurrentCourse(Course || null);
    setCurrentTopic(Topic || null);
    setCurrentLesson(Lesson || null);

    if (Course) {
      const items = Course.topics.map((topic) => ({
        name: topic.title,
        url: `/courses/${courseId}/topics/${topic.id}`,
        icon: FaAngleDown,
        subItems: topic.lessons.map((lesson) => ({
          name: lesson.title,
          url: `/courses/${courseId}/topics/${topic.id}/lessons/${lesson.id}`,
          icon: FaAngleRight,
        })),
      }));
      setNavItems(items);
    }
  }, [courseId, topicId, lessonId]);

  const handleToggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const handleGoBack = () => {
    router.push(`/courses/${courseId}`);
  };

  return (
    <div className="flex flex-row h-full">
      {isSidebarVisible && (
        <Sidebar
          className="bg-foreground hidden sm:block transition-all duration-300"
          items={navItems}
        />
      )}
      <div className="flex flex-col w-full">
        <div className="flex flex-row justify-between items-center h-16 w-full bg-slate-950 p-4">
          <Button variant="outline" size="icon" onClick={handleToggleSidebar}>
            {isSidebarVisible ? ( <FaToggleOn className="h-5 w-5" /> ) : ( <FaToggleOff className="h-5 w-5" /> )}
          </Button>
          <Button variant="outline" size="sm" onClick={handleGoBack}>
            Kurs Sayfasına Geri Dön
          </Button>
        </div>
        <div className="flex-grow w-full">
          {children}
        </div>
      </div>
    </div>
  );
}
