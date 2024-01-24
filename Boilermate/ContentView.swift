//
//  ContentView.swift
//  Boilermate
//
//  Created by Atharva Rao on 1/18/24.
//

import SwiftUI

struct ContentView: View
{
    @State private var infoSheet = false
    
    var body: some View
    {
        NavigationView 
        {
            VStack
            {
                Spacer()
                Text("Welcome to Boilermate")
                    .font(.title)
                    .bold()
                    .padding()
                HStack
                {
                    Spacer()
//                    Text("Start Learning")
//                        .padding()
//                        .cornerRadius(10)
                    NavigationLink(destination: LoginView())
                    {
                        //Image(systemName: "chevron.right")
                        Text("Get Started")
                            .padding()
                            .foregroundColor(.black)
                            .frame(width: 300, height: 50)
                            .background(Color.purdueGold)
                            .cornerRadius(10)
                    }
                    Spacer()
                }
                Spacer()
                HStack {
                    Button(action: { infoSheet.toggle() })
                    {
                        Image(systemName: "info.circle")
                            .imageScale(.large)
    //                    Text("What is Boilermate?")
    //                        .foregroundColor(.blue)
    //                        .underline()
                    }
                    .padding()
                    .sheet(isPresented: $infoSheet) {
                        // Content of the sheet
                        BoilermateInfoSheet()
                }
                }
                
            }
            .padding()
            .navigationBarTitle("", displayMode: .inline)
        }
    }
}

struct BoilermateInfoSheet: View 
{
    var body: some View 
    {
        VStack 
        {
            Text("What is Boilermate?")
                .font(.title)
                .padding()
            Text("Boilermate is an experimental project ")
            // Add more information about Boilermate here
            
            Spacer()
        }
        .padding()
    }
}


struct ContentView_Previews: PreviewProvider
{
    static var previews: some View
    {
        ContentView()
    }
}
//#Preview {
//    ContentView()
//}

/*
 struct ContentView: View {
     var body: some View {
         NavigationView {
             VStack {
                 Text("Welcome to the Home Page!")
                     .padding()

                 NavigationLink("Go to Second Page", destination: SecondPage())
                     .padding()
             }
             .navigationTitle("Home Page")
         }
     }
 }

 struct SecondPage: View {
     var body: some View {
         Text("This is the Second Page!")
             .padding()
             .navigationTitle("Second Page")
     }
 }
 */
