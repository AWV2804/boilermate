//
//  LoginView.swift
//  Boilermate
//
//  Created by Atharva Rao on 1/19/24.
//

import Foundation
import SwiftUI

struct LoginView: View 
{
    @State private var username: String = ""
    @State private var password: String = ""
    //@Environment(\.colorScheme) var colorScheme

    //@State private var isSignupSheetPresented = false

    var body: some View 
    {
        VStack()
        {
            Spacer()
            
            TextField("Username", text: $username)
                .padding()
                    .frame(width: 300, height: 50)
                    .autocapitalization(.none)
                    .background(displayMode() == .light ? Color.lightModeTextField : Color.darkModeTextField)
                    .cornerRadius(10)
                    
            
            SecureField("Password", text: $password)
                .padding()
                .frame(width: 300, height: 50)
                .autocapitalization(.none)
                .background(displayMode() == .light ? Color.lightModeTextField : Color.darkModeTextField)
                .cornerRadius(10)
                
            Spacer().frame(height: 30)
            Button(action: { print("Login button tapped") })
            {
                Text("Login")
                    .frame(width: 300, height: 50)
                    .foregroundColor(Color.black)
                    .background(Color.purdueGold)
                    .cornerRadius(10)
            }
            
            NavigationLink(destination: SignupView())
            {
               
                Text("Don't have an account? Sign up")
                    .padding(.top)
                    .bold()
                    .opacity(0.8)
//                    Text("Sign up")
//                        .bold()
//                        .underline()
//                        .opacity(0.8)
            }

            Spacer()
        }
        .padding()
        .navigationBarBackButtonHidden(true)
        .navigationBarTitle("Boilermate Login", displayMode: .inline)
    }
}
//            NavigationLink(destination: SignupView())
//            {
//                HStack
//                {
//                    Text("Don't have an account?")
//                        
//                        .opacity(0.6)
//                    Text("Sign up")
////                        .padding()
//                        .underline()
//                        .opacity(0.6)
//                }
//            }
//            Spacer()
//        }
//        .padding()
//        .navigationBarTitle("Login", displayMode: .inline)
//    }
//}
#Preview {
    LoginView()
}
