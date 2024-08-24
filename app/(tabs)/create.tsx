import CustomButton from "@/components/CustomButton";
import FormField from "@/components/FormField";
import UploadField from "@/components/UploadField";
import { useGlobalContext } from "@/context/GlobalProvider";
import { createVideo } from "@/lib/appwrite";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, SafeAreaView, ScrollView, Text } from "react-native";

type UploadForm = {
  title: string;
  prompt: string;
  video?: ImagePicker.ImagePickerAsset | null;
  thumnail?: ImagePicker.ImagePickerAsset | null;
};

const Create = () => {
  const { user } = useGlobalContext();
  const [form, setForm] = useState<UploadForm>({
    title: "",
    prompt: "",
  });
  const [uploading, setUploading] = useState(false);

  const openPicker = async (selectType: "video" | "image") => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:
        selectType === "image"
          ? ImagePicker.MediaTypeOptions.Images
          : ImagePicker.MediaTypeOptions.Videos,
      quality: 1,
    });

    if (result.canceled) {
      setTimeout(() => {
        console.log("Document was not picked", JSON.stringify(result, null, 2));
      }, 100);
      return;
    }

    if (selectType === "image") {
      setForm((prev) => ({ ...prev, thumnail: result.assets[0] }));
    } else {
      setForm((prev) => ({ ...prev, video: result.assets[0] }));
    }
  };

  const submit = async () => {
    if (Object.values(form).some((v) => !v)) {
      return Alert.alert("Please fill all fields");
    }

    setUploading(true);

    try {
      await createVideo({
        ...form,
        thumnail: form.thumnail!,
        video: form.video!,
        creator: user!.$id,
      });

      Alert.alert(`Uploading Successful`);
      router.push("/home");
    } catch (error) {
      Alert.alert(`Uploading failed with error ${(error as Error).message}`);
    } finally {
      setForm({
        title: "",
        prompt: "",
      });
      setUploading(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-white text-2xl font-psemibold mb-6">
          Upload Video
        </Text>

        <FormField
          title="Video Title"
          placeholder="Give your video a catchy title"
          containerStyles="mb-4"
          value={form.title}
          onChangeText={(text) => setForm((prev) => ({ ...prev, title: text }))}
        />

        <UploadField
          title="Upload Video"
          type="video"
          containerStyles="mb-4"
          onPress={() => openPicker("video")}
          value={form.video}
        />

        <UploadField
          title="Thumbnail Image"
          type="image"
          containerStyles="mb-4"
          onPress={() => openPicker("image")}
          value={form.thumnail}
        />

        <FormField
          title="AI Prompt"
          placeholder="The AI prompt of your video...."
          containerStyles="mb-4"
          value={form.prompt}
          onChangeText={(text) =>
            setForm((prev) => ({ ...prev, prompt: text }))
          }
        />

        <CustomButton className="w-full" isLoading={uploading} onPress={submit}>
          Submit & Publish
        </CustomButton>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
