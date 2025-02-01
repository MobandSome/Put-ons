import { Stack } from "expo-router";
import React from "react";

const RootLayout = () => {
    return (
        <Stack>
            <Stack.Screen
                name= "index"
                options={{
                    headerTitle: "home page",
                    headerStyle: {
                        backgroundColor: "blue",
                    },
                }}
            />
        </Stack>
    );
};
export default RootLayout; 