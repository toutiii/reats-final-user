
import { Button, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { ThemedView } from "@/components/ui/themed-view";
import { VStack } from "@/components/ui/vstack";
import { StackNavigation } from "@/types/navigation";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "@/context/AuthContext";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { ActivityIndicator, Keyboard, Pressable, SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native";
import { OtpInput } from "react-native-otp-entry";
import Animated, { FadeIn, SlideInRight, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

// Types
type VerificationStatus = null | "success" | "error";
type ResendStatus = "idle" | "sending" | "sent" | "failed";

const RESEND_TIMEOUT: number = 60; // 60 seconds for resend timeout

const OTPForm = () => {
    const navigation = useNavigation<StackNavigation>();
    const { login } = useAuth();
    const [otp, setOtp] = useState<string>("");
    const [timeLeft, setTimeLeft] = useState<number>(RESEND_TIMEOUT);
    const [isVerifying, setIsVerifying] = useState<boolean>(false);
    const [isResending, setIsResending] = useState<boolean>(false);
    const [verificationStatus, setVerificationStatus] = useState<VerificationStatus>(null);
    const [resendStatus, setResendStatus] = useState<ResendStatus>("idle");

    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const buttonScale = useSharedValue<number>(1);

    // Start the countdown timer when component mounts
    useEffect(() => {
        startTimer();

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, []);

    // Animation style for the confirm button
    const buttonAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: buttonScale.value }],
        };
    });

    const startTimer = (): void => {
        if (timerRef.current) clearInterval(timerRef.current);

        setTimeLeft(RESEND_TIMEOUT);
        timerRef.current = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 1) {
                    if (timerRef.current) clearInterval(timerRef.current);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);
    };

    const handleOtpChange = useCallback(
        (text: string): void => {
            setOtp(text);
            // Reset verification status when user modifies the OTP
            if (verificationStatus) {
                setVerificationStatus(null);
            }
        },
        [verificationStatus]
    );

    const handleOtpFilled = useCallback((text: string): void => {
        console.log(`OTP is ${text}`);
        // Auto-verify when all digits are filled (optional)
        // handleVerify();
    }, []);

    const formatTime = useCallback((seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }, []);

    const handleResendOtp = async (): Promise<void> => {
        if (timeLeft > 0 || isResending || verificationStatus === "success") return;

        Keyboard.dismiss();
        setIsResending(true);
        setResendStatus("sending");

        try {
            // Simulate API call
            await new Promise<void>((resolve) => setTimeout(resolve, 1500));

            // Start the timer again
            startTimer();

            // Clear the current OTP
            setOtp("");

            // Show success toast or feedback here
            setResendStatus("sent");

            // Reset status after a delay
            setTimeout(() => {
                setResendStatus("idle");
            }, 3000);
        } catch (error) {
            console.error("Failed to resend OTP:", error);
            setResendStatus("failed");

            // Reset status after a delay
            setTimeout(() => {
                setResendStatus("idle");
            }, 3000);
        } finally {
            setIsResending(false);
        }
    };

    const handleVerify = async (): Promise<void> => {
        if (otp.length !== 6 || isVerifying) return;

        Keyboard.dismiss();
        setIsVerifying(true);

        // Button press animation
        buttonScale.value = withSpring(0.95, {}, () => {
            buttonScale.value = withSpring(1);
        });

        try {
            // Simulate API verification
            await new Promise<void>((resolve) => setTimeout(resolve, 1500));

            // For demo, we'll simulate success if OTP is "123456"
            if (otp === "123456") {
                setVerificationStatus("success");
                // Update the authentication state
                setTimeout(() => {
                    login();
                }, 1000);
            } else {
                setVerificationStatus("error");
            }
        } catch (error) {
            console.error("OTP verification failed:", error);
            setVerificationStatus("error");
        } finally {
            setIsVerifying(false);
        }
    };

    // Determine if the confirm button should be enabled
    const isConfirmEnabled: boolean = otp.length === 6 && !isVerifying && verificationStatus !== "success";

    return (
        <ThemedView className="pt-8 flex-1 bg-white rounded-t-3xl">
            <Pressable style={{ flex: 1 }} onPress={() => Keyboard.dismiss()}>
                <VStack className="flex-1 px-6" space="xl">
                    {/* Progress indicator */}
                    <HStack className="justify-center space-x-2 mb-4">
                        {[1, 2, 3].map((step) => (
                            <View key={`step-${step}`} className={`h-1 rounded-full ${step === 2
                                ? "bg-primary-500 w-16"
                                : "bg-gray-200 w-8"}`} />
                        ))}
                    </HStack>

                    {/* Header Text */}
                    <View>
                        <Text className="text-xl font-bold text-center mb-2">Vérification par code</Text>
                        <Text className="text-center text-gray-600 mb-6">Veuillez entrer le code à 6 chiffres envoyé sur votre numéro de téléphone pour vérifier votre compte.</Text>
                    </View>

                    {/* OTP Input Fields */}
                    <OtpInput
                        numberOfDigits={6}
                        focusColor="#FF6347"
                        autoFocus={true}
                        hideStick={true}
                        placeholder=""
                        blurOnFilled={true}
                        disabled={isVerifying || verificationStatus === "success"}
                        type="numeric"
                        secureTextEntry={false}
                        focusStickBlinkingDuration={500}
                        onTextChange={handleOtpChange}
                        onFilled={handleOtpFilled}
                        textInputProps={{
                            accessibilityLabel: "Code de vérification",
                        }}
                        textProps={{
                            accessibilityRole: "text" as any,
                            accessibilityLabel: "Chiffre du code",
                            allowFontScaling: false,
                        }}
                        theme={{
                            pinCodeContainerStyle: styles.pinCodeContainer,
                            pinCodeTextStyle: styles.pinCodeText,
                            focusStickStyle: styles.focusStick,
                            focusedPinCodeContainerStyle: styles.activePinCodeContainer,
                            placeholderTextStyle: styles.placeholderText,
                            filledPinCodeContainerStyle: styles.filledPinCodeContainer,
                            disabledPinCodeContainerStyle: styles.disabledPinCodeContainer,
                        }}
                    />

                    {/* Verification status indicator */}
                    {verificationStatus && (
                        <Animated.View entering={SlideInRight.duration(400)} className="items-center">
                            <HStack className="items-center my-2" space="xs">
                                <Feather name={verificationStatus === "success"
                                    ? "check-circle"
                                    : "alert-circle"} size={20} color={verificationStatus === "success"
                                        ? "#10B981"
                                        : "#EF4444"} />
                                <Text className={`${verificationStatus === "success"
                                    ? "text-green-600"
                                    : "text-red-500"}`}>{verificationStatus === "success"
                                        ? "Code vérifié avec succès"
                                        : "Code incorrect, veuillez réessayer"}</Text>
                            </HStack>
                        </Animated.View>
                    )}

                    {/* Resend status message */}
                    {resendStatus === "sent" && (
                        <Animated.View entering={SlideInRight.duration(400)} className="items-center my-1">
                            <HStack className="items-center" space="xs">
                                <Feather name="check-circle" size={16} color="#10B981" />
                                <Text className="text-green-600 text-sm">Nouveau code envoyé avec succès</Text>
                            </HStack>
                        </Animated.View>
                    )}

                    {resendStatus === "failed" && (
                        <Animated.View entering={SlideInRight.duration(400)} className="items-center my-1">
                            <HStack className="items-center" space="xs">
                                <Feather name="alert-circle" size={16} color="#EF4444" />
                                <Text className="text-red-500 text-sm">Échec de l'envoi, réessayez plus tard</Text>
                            </HStack>
                        </Animated.View>
                    )}

                    {/* "A code has been sent" Text */}
                    <Text style={styles.subText}>Un code a été envoyé à votre téléphone</Text>

                    {/* Resend Timer */}
                    <Pressable onPress={handleResendOtp} disabled={timeLeft > 0 || isResending || verificationStatus === "success"} className={`items-center py-2 ${timeLeft === 0
                        ? "opacity-100"
                        : "opacity-70"}`}>
                        {isResending
                            ? (
                                <HStack space="sm" className="items-center">
                                    <ActivityIndicator size="small" color="#FF6347" />
                                    <Text size="md" className="font-medium">
                                        Envoi en cours...
                                    </Text>
                                </HStack>
                            )
                            : (
                                <Text size="lg" className={`text-center font-bold ${timeLeft === 0
                                    ? "text-primary-500"
                                    : "text-gray-500"}`}>
                                    {timeLeft === 0
                                        ? "Renvoyer le code"
                                        : `Renvoyer dans ${formatTime(timeLeft)}`}
                                </Text>
                            )}
                    </Pressable>

                    {/* Confirm Button */}
                    <Animated.View style={[{ width: "100%" }, buttonAnimatedStyle]}>
                        <Button size="xl" className={`my-4 w-full rounded-full ${!isConfirmEnabled
                            ? "opacity-70"
                            : ""}`} onPress={handleVerify} disabled={!isConfirmEnabled}>
                            {isVerifying
                                ? <ActivityIndicator size="small" color="white" />
                                : <ButtonText size="lg">Vérifier</ButtonText>}
                        </Button>
                    </Animated.View>

                    {/* Back link */}
                    <View className="flex-row justify-center mt-2">
                        <Text className="text-base text-gray-500">Vous n'avez pas reçu de code ? </Text>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Text className="text-base text-primary-500 font-bold">Retour</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Extra spacer at bottom */}
                    <View style={{ height: 20 }} />
                </VStack>
            </Pressable>
        </ThemedView>

    );
};

const styles = StyleSheet.create({
    pinCodeContainer: {
        borderWidth: 1.5,
        borderColor: "#E5E7EB",
        borderRadius: 12,
        width: 50,
        height: 60,
        backgroundColor: "#F9FAFB",
        marginHorizontal: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 1,
        elevation: 1,
    },
    pinCodeText: {
        color: "#000000",
        fontSize: 24,
        fontWeight: "600",
        textAlign: "center",
    },
    focusStick: {
        display: "none",
    },
    activePinCodeContainer: {
        borderColor: "#FF6347",
        backgroundColor: "#FFF5F5",
    },
    placeholderText: {
        color: "#D1D5DB",
        fontSize: 24,
    },
    filledPinCodeContainer: {
        borderColor: "#FF6347",
        backgroundColor: "#FFFFFF",
    },
    disabledPinCodeContainer: {
        backgroundColor: "#F3F4F6",
        borderColor: "#E5E7EB",
    },
    subText: {
        color: "#6B7280",
        fontSize: 15,
        textAlign: "center",
        marginTop: 8,
    },
});

export default OTPForm;