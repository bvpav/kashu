import { useEffect, useState } from "react";

export default function useStorePath() {
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    if (shouldShow) {
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
    y: 4,
  },
  {
    is_collectable: false,
    x: 2,
    y: 3,
  },
  {
    is_collectable: true,
    x: 3,
    y: 2,
  },
  {
    is_collectable: false,
    x: 2,
    y: 1,
  },
  {
    is_collectable: true,
    x: 2,
    y: 0,
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
    is_collectable: false,
    x: 9,
    y: 1,
  },
  {
    is_collectable: false,
    x: 10,
    y: 1,
  },
  {
    is_collectable: false,
    x: 11,
    y: 2,
  },
  {
    is_collectable: true,
    x: 12,
    y: 2,
  },
  {
    is_collectable: true,
    x: 13,
    y: 3,
  },
  {
    is_collectable: true,
    x: 13,
    y: 4,
  },
  {
    is_collectable: true,
    x: 13,
    y: 3,
  },
  {
    is_collectable: true,
    x: 12,
    y: 2,
  },
  {
    is_collectable: false,
    x: 13,
    y: 1,
  },
  {
    is_collectable: false,
    x: 14,
    y: 2,
  },
  {
    is_collectable: true,
    x: 13,
    y: 3,
  },
  {
    is_collectable: false,
    x: 14,
    y: 3,
  },
  {
    is_collectable: true,
    x: 15,
    y: 3,
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
    y: 6,
  },
  {
    is_collectable: false,
    x: 17,
    y: 7,
  },
  {
    is_collectable: false,
    x: 18,
    y: 7,
  },
  {
    is_collectable: false,
    x: 19,
    y: 7,
  },
  {
    is_collectable: false,
    x: 20,
    y: 7,
  },
  {
    is_collectable: false,
    x: 21,
    y: 8,
  },
  {
    is_collectable: false,
    x: 22,
    y: 9,
  },
  {
    is_collectable: true,
    x: 23,
    y: 10,
  },
  {
    is_collectable: false,
    x: 22,
    y: 10,
  },
  {
    is_collectable: false,
    x: 21,
    y: 10,
  },
  {
    is_collectable: false,
    x: 20,
    y: 10,
  },
  {
    is_collectable: false,
    x: 19,
    y: 10,
  },
  {
    is_collectable: false,
    x: 18,
    y: 10,
  },
  {
    is_collectable: false,
    x: 17,
    y: 10,
  },
  {
    is_collectable: false,
    x: 16,
    y: 10,
  },
  {
    is_collectable: false,
    x: 15,
    y: 10,
  },
  {
    is_collectable: false,
    x: 14,
    y: 11,
  },
  {
    is_collectable: false,
    x: 13,
    y: 12,
  },
  {
    is_collectable: false,
    x: 12,
    y: 13,
  },
  {
    is_collectable: false,
    x: 11,
    y: 14,
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
    y: 18,
  },
  {
    is_collectable: true,
    x: 5,
    y: 18,
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
    is_collectable: true,
    x: 0,
    y: 17,
  },
];
