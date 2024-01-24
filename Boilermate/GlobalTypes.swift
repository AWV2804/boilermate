//
//  GlobalTypes.swift
//  Boilermate
//
//  Created by Atharva Rao on 1/19/24.
//

import Foundation
import SwiftUI
import UIKit

extension Color
{
    static let purdueGold = Color(red: 194/255, green: 142/255, blue: 12/255)
    static let purdueGoldDark = Color(red: 160/255, green: 110/255, blue: 10/255)
    static let darkModeTextField = Color.white.opacity(0.1)
    static let darkModeTextFieldDisabled = Color.white.opacity(0.25)
    static let lightModeTextField = Color.black.opacity(0.05)
    static let lightModeTextFieldDisabled = Color.black.opacity(0.20)

}


func displayMode() -> UIUserInterfaceStyle {
    if #available(iOS 13.0, *) {
        let currentTraitCollection = UITraitCollection.current
        return currentTraitCollection.userInterfaceStyle
    } else {
        // Fallback for older iOS versions
        return .light
    }
}

let mainScreenHeight = UIScreen.main.bounds.size.height
