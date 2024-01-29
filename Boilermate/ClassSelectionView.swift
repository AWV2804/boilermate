//
//  SignupView.swift
//  Boilermate
//
//  Created by Atharva Rao on 1/19/24.
//
import SwiftUI

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
