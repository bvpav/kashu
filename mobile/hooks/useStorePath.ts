import { useEffect, useState } from "react";

export default function useStorePath() {
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    if (shouldShow) {
      console.log("Showing store route");
      return;
    }
    const timeout = setTimeout(() => {
      setShouldShow(true);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  return shouldShow ? path : [];
}

const path = [
  {
    is_collectable: false,
    x: 0,
    y: 6,
  },
  {
    is_collectable: false,
    x: 1,
    y: 5,
  },
  {
    is_collectable: false,
    x: 2,
    y: 4,
  },
  {
    is_collectable: true,
    x: 3,
    y: 3,
  },
  {
    is_collectable: false,
    x: 2,
    y: 2,
  },
  {
    is_collectable: false,
    x: 3,
    y: 1,
  },
  {
    is_collectable: false,
    x: 4,
    y: 1,
  },
  {
    is_collectable: false,
    x: 5,
    y: 2,
  },
  {
    is_collectable: true,
    x: 4,
    y: 3,
  },
  {
    is_collectable: false,
    x: 5,
    y: 3,
  },
  {
    is_collectable: true,
    x: 6,
    y: 3,
  },
  {
    is_collectable: false,
    x: 5,
    y: 2,
  },
  {
    is_collectable: false,
    x: 6,
    y: 1,
  },
  {
    is_collectable: false,
    x: 7,
    y: 1,
  },
  {
    is_collectable: false,
    x: 8,
    y: 2,
  },
  {
    is_collectable: true,
    x: 7,
    y: 3,
  },
  {
    is_collectable: false,
    x: 8,
    y: 4,
  },
  {
    is_collectable: false,
    x: 9,
    y: 5,
  },
  {
    is_collectable: false,
    x: 10,
    y: 5,
  },
  {
    is_collectable: false,
    x: 11,
    y: 4,
  },
  {
    is_collectable: false,
    x: 12,
    y: 5,
  },
  {
    is_collectable: false,
    x: 13,
    y: 5,
  },
  {
    is_collectable: false,
    x: 14,
    y: 4,
  },
  {
    is_collectable: false,
    x: 15,
    y: 5,
  },
  {
    is_collectable: false,
    x: 16,
    y: 5,
  },
  {
    is_collectable: false,
    x: 17,
    y: 4,
  },
  {
    is_collectable: false,
    x: 18,
    y: 5,
  },
  {
    is_collectable: false,
    x: 19,
    y: 5,
  },
  {
    is_collectable: false,
    x: 20,
    y: 4,
  },
  {
    is_collectable: false,
    x: 21,
    y: 5,
  },
  {
    is_collectable: false,
    x: 22,
    y: 5,
  },
  {
    is_collectable: false,
    x: 23,
    y: 4,
  },
  {
    is_collectable: false,
    x: 24,
    y: 5,
  },
  {
    is_collectable: false,
    x: 25,
    y: 5,
  },
  {
    is_collectable: false,
    x: 26,
    y: 4,
  },
  {
    is_collectable: true,
    x: 27,
    y: 4,
  },
  {
    is_collectable: false,
    x: 28,
    y: 5,
  },
  {
    is_collectable: false,
    x: 29,
    y: 6,
  },
  {
    is_collectable: false,
    x: 30,
    y: 7,
  },
  {
    is_collectable: false,
    x: 31,
    y: 7,
  },
  {
    is_collectable: false,
    x: 32,
    y: 7,
  },
  {
    is_collectable: false,
    x: 33,
    y: 7,
  },
  {
    is_collectable: false,
    x: 34,
    y: 7,
  },
  {
    is_collectable: true,
    x: 35,
    y: 8,
  },
  {
    is_collectable: false,
    x: 36,
    y: 7,
  },
  {
    is_collectable: false,
    x: 37,
    y: 7,
  },
  {
    is_collectable: false,
    x: 38,
    y: 8,
  },
  {
    is_collectable: false,
    x: 38,
    y: 9,
  },
  {
    is_collectable: false,
    x: 37,
    y: 10,
  },
  {
    is_collectable: false,
    x: 36,
    y: 10,
  },
  {
    is_collectable: true,
    x: 35,
    y: 9,
  },
  {
    is_collectable: false,
    x: 34,
    y: 10,
  },
  {
    is_collectable: false,
    x: 33,
    y: 10,
  },
  {
    is_collectable: false,
    x: 32,
    y: 10,
  },
  {
    is_collectable: false,
    x: 31,
    y: 10,
  },
  {
    is_collectable: false,
    x: 30,
    y: 10,
  },
  {
    is_collectable: false,
    x: 29,
    y: 10,
  },
  {
    is_collectable: false,
    x: 28,
    y: 10,
  },
  {
    is_collectable: false,
    x: 27,
    y: 10,
  },
  {
    is_collectable: false,
    x: 26,
    y: 11,
  },
  {
    is_collectable: false,
    x: 25,
    y: 12,
  },
  {
    is_collectable: false,
    x: 24,
    y: 13,
  },
  {
    is_collectable: false,
    x: 23,
    y: 14,
  },
  {
    is_collectable: false,
    x: 22,
    y: 15,
  },
  {
    is_collectable: false,
    x: 21,
    y: 15,
  },
  {
    is_collectable: false,
    x: 20,
    y: 16,
  },
  {
    is_collectable: false,
    x: 19,
    y: 16,
  },
  {
    is_collectable: false,
    x: 18,
    y: 15,
  },
  {
    is_collectable: false,
    x: 17,
    y: 15,
  },
  {
    is_collectable: false,
    x: 16,
    y: 16,
  },
  {
    is_collectable: false,
    x: 15,
    y: 16,
  },
  {
    is_collectable: false,
    x: 14,
    y: 15,
  },
  {
    is_collectable: false,
    x: 13,
    y: 15,
  },
  {
    is_collectable: false,
    x: 12,
    y: 16,
  },
  {
    is_collectable: false,
    x: 11,
    y: 16,
  },
  {
    is_collectable: false,
    x: 10,
    y: 15,
  },
  {
    is_collectable: false,
    x: 9,
    y: 15,
  },
  {
    is_collectable: false,
    x: 8,
    y: 16,
  },
  {
    is_collectable: false,
    x: 7,
    y: 17,
  },
  {
    is_collectable: false,
    x: 6,
    y: 17,
  },
  {
    is_collectable: false,
    x: 5,
    y: 17,
  },
  {
    is_collectable: false,
    x: 4,
    y: 17,
  },
  {
    is_collectable: false,
    x: 3,
    y: 17,
  },
  {
    is_collectable: false,
    x: 2,
    y: 17,
  },
  {
    is_collectable: false,
    x: 1,
    y: 17,
  },
  {
    is_collectable: false,
    x: 0,
    y: 17,
  },
];
