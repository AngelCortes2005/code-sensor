"use client";

import { motion } from "framer-motion";
import React, { useMemo, useState, useEffect } from "react";
import { Meteor } from "../types/types";

const MeteorBackground: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const meteors: Meteor[] = useMemo(() => {
    if (!isMounted) {
      return [];
    }
    
    return Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 5,
      duration: 2.5 + Math.random() * 2, 
    }));
  }, [isMounted]);

  if (!isMounted) {
    return (
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1] bg-black" />
    );
  }

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1] bg-black">
      {meteors.map((meteor) => (
        <motion.div
          key={meteor.id}
          initial={{ x: 0, y: 0, opacity: 0 }}
          animate={{
            x: 400,
            y: 400,
            opacity: [0, 1, 0.3, 0],
          }}
          transition={{
            delay: meteor.delay,
            duration: meteor.duration,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeOut",
          }}
          className="
            absolute 
            w-[3px] 
            h-[120px] 
            rounded-full
            bg-linear-to-b 
            from-white/90 
            via-white/40 
            to-transparent
            blur-[1px]
          "
          style={{
            top: meteor.top,
            left: meteor.left,
            rotate: '135deg',
          }}
        />
      ))}
    </div>
  );
};

export default MeteorBackground;