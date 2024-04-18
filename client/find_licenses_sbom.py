import json

def find_licenses_in_sbom(sbom_file):
    """Finds the licenses in an SBOM file.

    Args:
      sbom_file: The path to the SBOM file.

    Returns:
      A list of unique license IDs.
    """
    licenses = []
    with open(sbom_file, "r") as f:
        sbom = json.load(f)

    # Navigate through each component to extract license IDs
    for component in sbom["components"]:
        # Check if the 'licenses' key exists and is a list
        if "licenses" in component and isinstance(component["licenses"], list):
            for license_entry in component["licenses"]:
                # Safely access the 'license' key
                license_info = license_entry.get("license")
                if license_info and "id" in license_info:
                    license_id = license_info["id"]
                    if license_id not in licenses:
                        licenses.append(license_id)

    return licenses


if __name__ == "__main__":
    sbom_file = "/Users/atharvarao/Documents/boilermate/client/sbom-cyclonedx.json"  # Adjust this path to your SBOM file location
    licenses = find_licenses_in_sbom(sbom_file)

    if licenses:
        print("The following licenses were found in the SBOM:")
        for license in licenses:
            print(license)
    else:
        print("No licenses found.")
