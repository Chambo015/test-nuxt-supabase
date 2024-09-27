export default {
  root: ({ props }) => ({
    class: [
      {
        "opacity-60 select-none pointer-events-none cursor-default":
          props.disabled,
      },
      "bg-gray-100 flex p-2 rounded-full",
    ],
  }),
  button: ({ context, props }) => ({
    class: [
      "relative",
      // Font
      "leading-none",

      // Flex Alignment
      "inline-flex items-center align-bottom text-center text-gray-500",

      // Spacing

      // Shape
      "border border-r-0",
      "rounded-full",
      "w-full",
      "justify-center",
      "border-0 h-10",
      // "last:border-r last:rounded-tl-none last:rounded-bl-none last:rounded-r-md",

      // Color
      {
        "bg-white text-violet-600 dark:text-surface-900 shadow-sm":
          context.active,
      },
      // Invalid State
      { "border-red-500 dark:border-red-400": props.invalid },

      // States
      {
        "hover:text-violet-600": context.active,
      },
      {
        "opacity-60 select-none pointer-events-none cursor-default":
          context.disabled,
      },
      // Transition
      "transition duration-200",

      // Misc
      "cursor-pointer select-none overflow-hidden",
    ],
  }),
  label: {
    class: "text-sm hover:text-violet-600",
  },
};
