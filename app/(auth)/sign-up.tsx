import { View, Text, ScrollView, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link } from "expo-router";
import { images } from "@/constants";

const SignUp = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);

  const submit = () => {};

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
