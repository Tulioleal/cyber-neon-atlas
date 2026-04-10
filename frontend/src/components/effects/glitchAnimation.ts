import { colorsWithAlpha } from "@/utils/colors"
import { HTMLMotionProps } from "motion/react"

type AnimationProps = HTMLMotionProps<"div">

const containerAnimationProps = (isPrimary: boolean = true):AnimationProps => ({
  exit:{
    backgroundColor: [
      colorsWithAlpha[ isPrimary ? 'primary' : 'secondary' ](0.1),
      colorsWithAlpha[ isPrimary ? 'primary' : 'secondary' ](0.5),
      colorsWithAlpha[ isPrimary ? 'primary' : 'secondary' ](0.1),
      colorsWithAlpha[ isPrimary ? 'primary' : 'secondary' ](0.35),
      colorsWithAlpha[ isPrimary ? 'primary' : 'secondary' ](0),
    ]
  },
  transition:{
    duration: 0.5,
    times: [0, 0.2, 0.4, 0.6, 1]
  },
})

const contentAnimationProps:AnimationProps = {
  initial:{ opacity: 0 },
  animate:{ opacity: 1 },
  exit:{ opacity: 0 },
  transition:{ duration: 0.1, ease: "anticipate" },
}

export const GlitchAnimation = {
  container: containerAnimationProps,
  content: contentAnimationProps,
}