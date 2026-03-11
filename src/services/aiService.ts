export async function askAI(question: string) {

  return new Promise<string>((resolve) => {

    setTimeout(() => {

      resolve(
        "Berdasarkan skill yang kamu miliki, kamu bisa mencoba peluang seperti freelance digital, jasa kreatif, atau membangun bisnis kecil."
      )

    }, 1000)

  })

}