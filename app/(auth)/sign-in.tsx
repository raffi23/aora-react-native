import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { signIn } from "@/lib/appwrite";

const SignIn = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);

  const submit = async () => {
    if (Object.values(form).some((v) => !v))
      Alert.alert("Error", "Please fill missing fields");

    setSubmitting(true);

    try {
      await signIn(form.email, form.password);

      router.replace("/(tabs)/home");
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 my-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[150px] h-[35px]"
          />
          <Text className="text-white font-psemibold text-2xl mt-10">
            Login into Aora
          </Text>

          <FormField
            containerStyles="mt-7"
            title="Email"
            placeholder="enter email"
            keyboardType="email-address"
            value={form.email}
            onChangeText={(text) =>
              setForm((prev) => ({ ...prev, email: text }))
            }
          />
          <FormField
            title="Password"
            containerStyles="mt-7"
            placeholder="enter password"
            secureTextEntry
            value={form.password}
            onChangeText={(text) =>
              setForm((prev) => ({ ...prev, password: text }))
            }
          />

          <CustomButton
            onPress={submit}
            isLoading={submitting}
            className="mt-7"
          >
            Sign In
          </CustomButton>

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have account?
            </Text>
            <Link
              className="text-lg text-secondary font-psemibold"
              href="/(auth)/sign-up"
            >
              Sign up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
