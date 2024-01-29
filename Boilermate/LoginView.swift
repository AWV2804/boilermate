//
//  LoginView.swift
//  Boilermate
//
//  Created by Atharva Rao on 1/19/24.
//

import Foundation
import SwiftUI
import Firebase

struct LoginView: View
{
    
    @State private var username: String =   ""
    @State private var email: String =      ""
    @State private var password: String =   ""
    @State private var isLoginSuccessful = false
    //@Environment(\.colorScheme) var colorScheme

    //@State private var isSignupSheetPresented = false

    var body: some View 
    {
        VStack()
        {
            Spacer()
            
//            TextField("Username", text: $username)
//                .padding()
//                    .frame(width: 300, height: 50)
//                    .autocapitalization(.none)
//                    .background(displayMode() == .light ? Color.lightModeTextField : Color.darkModeTextField)
//                    .cornerRadius(10)
//                    
            TextField("Email", text: $email)
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

            Button(action: {
                login()
            }) {
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
    
    func login()
    {
        Auth.auth().signIn(withEmail: email, password: password) { result, error in
            if error != nil
            {
                print(error!.localizedDescription)
            }
            else
            {
                isLoginSuccessful = true
            }
        }
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

struct SignupView: View
{
    //@State private var welcomeMessageOpacity = 0.0
    @State private var isEmailFieldVisible = true
    //@State private var isUserNameFieldVisible = true
    @State private var isPasswordFieldVisible = false
    @State private var isConfirmPasswordFieldVisible = false
    @State private var isSchoolNameFieldVisible = false
    @State private var isLooksGoodVisible = false
    @State private var isRegistrationSuccessful = false
    
    @State private var email: String = ""
    @State private var username: String = ""
    @State private var password: String = ""
    @State private var confirmPassword: String = ""
    @State private var schoolName: String = "Purdue University WL"
    var body: some View
    {
        VStack
        {
            // I want to add a progress bar later
            
            
            //            Text("Let's make an account")
            //                .font(.title)
            //                .foregroundColor(.blue)
            //                .opacity(welcomeMessageOpacity)
            //                .offset(y: isUserNameFieldVisible ? -300 : 0) // Adjust the value as needed
            //                .onAppear
            //{
                //                    withAnimation(Animation.easeInOut(duration: 0.2).delay(0.2))
                //                    {
                //                        welcomeMessageOpacity = 1.0
                //                    }
                //
                //                    DispatchQueue.main.asyncAfter(deadline: .now() + 0.5)
                //                    {
                //                        withAnimation
                //                        {
                //                            isUserNameFieldVisible = true
                //                        }
                //                    }
                //                }
                //Spacer()
        
            if isEmailFieldVisible
            {
                TextField("Enter your email", text: $email)
                    .padding()
                    .frame(width: 300, height: 50)
                    .autocapitalization(.none)
                    .background(displayMode() == .light ? Color.lightModeTextField : Color.darkModeTextField)
                    .cornerRadius(10)
                    .onSubmit
                {
                    isPasswordFieldVisible = true
                }
            }
            /*
            if isUserNameFieldVisible
            {
                TextField("Enter your username", text: $username)
                    .padding()
                    .frame(width: 300, height: 50)
                    .autocapitalization(.none)
                    .background(displayMode() == .light ? Color.lightModeTextField : Color.darkModeTextField)
                    .cornerRadius(10)
                    .onSubmit
                {
                    isPasswordFieldVisible = true
                }
            }
         */
            if isPasswordFieldVisible
            {
                SecureField("Enter your password", text: $password)
                    .padding()
                    .frame(width: 300, height: 50)
                    .autocapitalization(.none)
                    .background(displayMode() == .light ? Color.lightModeTextField : Color.darkModeTextField)
                    .cornerRadius(10)
                    .onSubmit
                {
                    isConfirmPasswordFieldVisible = true
                }
            }
            if isConfirmPasswordFieldVisible
            {
                SecureField("Confirm your password", text: $confirmPassword)
                    .padding()
                    .frame(width: 300, height: 50)
                    .autocapitalization(.none)
                    .background(displayMode() == .light ? Color.lightModeTextField : Color.darkModeTextField)
                    .cornerRadius(10)
                    .onSubmit
                {
                    isSchoolNameFieldVisible = true
                    isLooksGoodVisible = true
                }
            }
            if isSchoolNameFieldVisible
            {
                TextField("Enter your school", text: $schoolName)
                    .padding()
                    .frame(width: 300, height: 50)
                    .autocapitalization(.none)
                    .background(displayMode() == .light ? Color.lightModeTextFieldDisabled : Color.darkModeTextFieldDisabled)
                    .cornerRadius(10)
                    .disabled(true)
                    .onAppear()
                {
                    isLooksGoodVisible = true
                }
            }
            
            Spacer().frame(height: 30)
            
            if isLooksGoodVisible
            {
                Button
                {
                    register()
                }
               label:
                {
                    Text("Looks Good")
                        .padding()
                        .foregroundColor(.black)
                        .frame(width: 300, height: 50)
                        .background(Color.purdueGold)
                        .cornerRadius(10)
                    //if (isRegistrationSuccessful)
                        
                }
            }
            
            NavigationLink(destination: LoginView())
            {
                Text("Already have an account? Login")
                    .padding(.top)
                    .bold()
            }
            
            .padding()
            .navigationBarBackButtonHidden(true)
            .navigationBarTitle("Boilermate Sign Up", displayMode: .inline)
        }
    }
    
    func register()
    {
        Auth.auth().createUser(withEmail: email, password: password) { result, error in
            if error != nil
            {
                print(error!.localizedDescription)
            }
            else
            {
                isRegistrationSuccessful = true
            }
        }
    }
}

#Preview {
    LoginView()
}
