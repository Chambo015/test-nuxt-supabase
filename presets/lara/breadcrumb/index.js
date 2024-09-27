export default {
  root: {
    class: [
      // Misc
      "overflow-x-auto",
    ],
  },
  menu: {
    class: [
      // Flex & Alignment
      "flex items-center flex-nowrap",

      // Spacing
      "m-0 p-0 list-none leading-none",
    ],
  },
  action: {
    class: [
      // Flex & Alignment
      "flex items-center",

      // Shape
      "rounded-md",

      // Color
      "text-[#475467] dark:text-white/70",

      // Text
      "text-sm font-medium font-inter",

      // States
      "focus-visible:outline-none focus-visible:outline-offset-0",
      "focus-visible:ring focus-visible:ring-primary-400/50 dark:focus-visible:ring-primary-300/50",

      // Transitions
      "transition-shadow duration-200",

      // Misc
      "text-decoration-none",
    ],
  },
  icon: {
    class: "text-surface-600 dark:text-white/70",
  },
  separator: {
    class: [
      // Flex & Alignment
      "flex items-center",

      // Spacing
      " mx-2",
      // Size
      " w-3",
      // Color
      "text-[#D0D5DD] dark:text-white/70",
    ],
  },
};
