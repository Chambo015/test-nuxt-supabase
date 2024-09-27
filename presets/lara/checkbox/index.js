export default {
  root: {
    class: [
      "relative",

      // Alignment
      "inline-flex",
      "align-bottom",

      // Size
      "w-5",
      "h-5",

      // Misc
      "cursor-pointer",
      "select-none",
    ],
  },
  box: ({ props, context }) => ({
    class: [
      // Alignment
      "flex",
      "items-center",
      "justify-center",

      // Size
      "w-5",
      "h-5",

      // Shape
      "rounded-md",
      "border",

      // Colors
      {
        "border-surface-200 bg-white dark:border-surface-700 dark:bg-surface-900":
          !context.checked && !props.invalid,
        "border-primary bg-primary": context.checked,
      },

      // Invalid State
      { "border-red-500 dark:border-red-400": props.invalid },

      // States
      {
        "peer-hover:border-primary":
          !props.disabled && !context.checked && !props.invalid,
        "peer-hover:bg-primary-hover peer-hover:border-primary-hover":
          !props.disabled && context.checked,
        "peer-focus-visible:border-primary-500 dark:peer-focus-visible:border-primary-400 peer-focus-visible:ring-2 peer-focus-visible:ring-primary-400/20 dark:peer-focus-visible:ring-primary-300/20":
          !props.disabled,
        "cursor-default opacity-60": props.disabled,
      },

      // Transitions
      "transition-colors",
      "duration-200",
    ],
  }),
  input: {
    class: [
      "peer",

      // Size
      "w-full ",
      "h-full",

      // Position
      "absolute",
      "top-0 left-0",
      "z-10",

      // Spacing
      "p-0",
      "m-0",

      // Shape
      "opacity-0",
      "rounded-md",
      "outline-none",
      "border border-surface-200 dark:border-surface-700",

      // Misc
      "appearance-none",
      "cursor-pointer",
    ],
  },
  icon: {
    class: [
      // Font
      "text-base leading-none",

      // Size
      "w-3",
      "h-3",

      // Colors
      "text-white dark:text-surface-900",

      // Transitions
      "transition-all",
      "duration-200",
    ],
  },
};
