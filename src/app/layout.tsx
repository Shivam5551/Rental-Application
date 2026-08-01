import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NextAuthProvider } from "./NextAuthProvider";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "BookIT",
    description:
        "A comprehensive rental property platform built with Next.js 16, designed to revolutionize property booking in India. Similar to Airbnb but tailored for the Indian market with advanced features for both property owners and travelers.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <Analytics />
                <NextAuthProvider>{children}</NextAuthProvider>
            </body>
        </html>
    );
}
