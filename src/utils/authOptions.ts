import CredentialsProvider from "next-auth/providers/credentials"
import Google from "next-auth/providers/google";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "Email", placeholder:"Enter your email"},
                password: {label: "Password", type:"password", placeholder:"Enter your password"}
            },
            async authorize(credentials)  {
                if(credentials?.email && credentials.password) {
                    // console.log(credentials);
                    return { id: "1", email: credentials.email }
                }
                return null;
            },
        }),
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        })
    ],
    secret: process.env.NEXTAUTH_SECRET || 'secret',

    callbacks: {
        session: async ({ session, token }: any) => {
            console.log("SEssion is");
            
            if (session?.user && session.user?.email) {
                // const userID = await prisma.user.findFirst({
                //   where: {
                //     email: session.user.email
                //   },
                //   select: {
                //     id: true
                //   }
                // })
                session.user.id = 10;
            }
            console.log("session is ", session);
            
            return session;
        },
        jwt: async ({ user, token }: any) => {
          
          if (user && user.id) {
              token.uid = user.id;
          }
          return token;
      },
      signIn: async ({ account, profile, user }: any) => {
        if(account.provider === "credentials") {
            const isExists = await findUser(user);
            return isExists ? true : false;
                  
          }
          async function findUser(u: any) {
            // console.log("Profile is", profile);
            // console.log("User is ", user);
            
            // const isExists = await prisma.user.findFirst({
            //   where: {
            //     email: u.email,
            //   },
            //   select: {
            //     id: true,
            //         email: true,
            //         name: true,
            //         password: true,
            //     }
            // })
            // return isExists;
            return true;
          }
          if ((account.provider === "google" && profile.email_verified)) {
            console.log(`Provider: ${account.provider}`);
            
            const isExists = await findUser(profile);
            // console.log(isExists);
            
              if(!isExists) {
                // console.log("Inside Creating user");
                
            //     await prisma.user.create({
            //       data: {
            //         email: profile.email,
            //         name: profile.name,
            //         authtype: "Google"
            //       },
            //       select: {
            //         id: true,
            //         email: true,
            //         name: true,
            //       }
            //     });
              }
              return true;
            }
          return false;
      }
    },
    pages: {
        signIn: '/signin'
    }
}