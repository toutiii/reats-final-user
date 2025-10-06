import { Center } from "@/components/ui/center";
import Animated, {
  FadeIn,
  FadeInUp,
  FadeInDown
} from "react-native-reanimated";

interface AuthHeaderProps {
  category: string;
  title: string;
  description: string;
  showSeparator?: boolean;
  delayOffset?: number;
}

const AuthHeader = ({
  category,
  title,
  description,
  showSeparator = true,
  delayOffset = 0
}: AuthHeaderProps) => {
  return (
    <>
      {/* Page Information Header */}
      <Animated.View
        entering={FadeInDown.delay(600 + delayOffset).duration(800)}
        className="mt-8 mb-12 relative z-10"
      >
        {/* Page Category */}
        <Animated.Text
          entering={FadeIn.delay(800 + delayOffset).duration(600)}
          className="text-primary-300 text-sm font-medium uppercase tracking-widest text-center opacity-80"
          style={{ letterSpacing: 2 }}
        >
          {category}
        </Animated.Text>

        {/* Page Title */}
        <Animated.Text
          entering={FadeInUp.delay(1000 + delayOffset).duration(800)}
          className="text-white text-4xl font-extrabold text-center mt-2 opacity-90"
          style={{ letterSpacing: 1 }}
        >
          {title}
        </Animated.Text>

        {/* Page Description */}
        <Animated.Text
          entering={FadeInUp.delay(1200 + delayOffset).duration(600)}
          className="text-slate-300 text-sm text-center mt-3 opacity-70 leading-5"
          style={{ letterSpacing: 0.3 }}
        >
          {description}
        </Animated.Text>
      </Animated.View>

      {/* Brand Section - More compact */}
      {showSeparator && (
        <Center className="justify-center pb-8 relative z-10">
          <Animated.View
            entering={FadeInUp.delay(1400 + delayOffset).duration(1000).springify()}
            className="relative items-center"
          >
            {/* Elegant separator */}
            <Animated.View
              entering={FadeIn.delay(2000 + delayOffset).duration(800)}
              className="w-16 h-px bg-gradient-to-r from-transparent via-primary-400 to-transparent mt-6 opacity-60"
            />
          </Animated.View>
        </Center>
      )}
    </>
  );
};

export default AuthHeader;