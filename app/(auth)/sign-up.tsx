import CustomButton from "@/components/CustomButton";
import FormField from "@/components/FormField";
import { images } from "@/constants";
import { useGlobalContext } from "@/context/GlobalProvider";
import { createUser } from "@/lib/appwrite";
import { User } from "@/lib/types";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Alert, Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SignUp = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);
  const { login } = useGlobalContext();

  const submit = async () => {
    if (Object.values(form).some((v) => !v))
      Alert.alert("Error", "Please fill missing fields");

    setSubmitting(true);

    try {
      const user = (await createUser(
        form.email,
        form.password,
        form.username
      )) as User;

      login?.(user);

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
            Sign up into Aora
          </Text>

          <FormField
            containerStyles="mt-10"
            title="Username"
            placeholder="enter username"
            value={form.username}
            onChangeText={(text) =>
              setForm((prev) => ({ ...prev, username: text }))
            }
          />

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
            Sign up
          </CustomButton>

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Already have an account?
            </Text>
            <Link
              className="text-lg text-secondary font-psemibold"
              href="/(auth)/sign-in"
            >
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
