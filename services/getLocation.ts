"use client";

export function getCurrentLocation(): Promise<[number, number] | null> {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported");
      resolve(null);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve([position.coords.latitude, position.coords.longitude]);
      },
      (error) => {
        console.log(error);
        resolve(null);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  });
}
