//
//  SignupView.swift
//  Boilermate
//
//  Created by Atharva Rao on 1/19/24.
//
import SwiftUI

struct SignupView: View 
{
    //@State private var welcomeMessageOpacity = 0.0
    @State private var isUserNameFieldVisible = true
    @State private var isPasswordFieldVisible = false
    @State private var isConfirmPasswordFieldVisible = false
    @State private var isSchoolNameFieldVisible = false
    @State private var isLooksGoodVisible = true
    
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
                NavigationLink(destination: ClassSelectView())
                {
                    //Image(systemName: "chevron.right")
                    Text("Looks Good")
                        .padding()
                        .foregroundColor(.black)
                        .frame(width: 300, height: 50)
                        .background(Color.purdueGold)
                        .cornerRadius(10)
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
}

struct ClassSelectView: View
{
    @State private var classSelectMessageOpacity = 0.0
    var body: some View
    {
        VStack
        {
            Text("Let's select your classes")
                .padding()
                .font(/*@START_MENU_TOKEN@*/.title/*@END_MENU_TOKEN@*/)
                .foregroundColor(/*@START_MENU_TOKEN@*/.blue/*@END_MENU_TOKEN@*/)
                .onAppear
                {
                    withAnimation(Animation.easeInOut(duration: 0.5).delay(0.2))
                    {
                        classSelectMessageOpacity = 1.0
                    }
                }
        }
    }
}

#Preview
{
    SignupView()
}
