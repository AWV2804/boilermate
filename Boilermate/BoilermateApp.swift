//
//  BoilermateApp.swift
//  Boilermate
//
//  Created by Atharva Rao on 1/19/24.
//

import SwiftUI
import Firebase

@main
struct BoilermateApp: App {
    init()
    {
        FirebaseApp.configure()
    }
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}
