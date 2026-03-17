const posts=[

  {
    name:"Andi",
    skill:"Programming",
    text:"Aku dapat klien pertama setelah ikut roadmap!"
  },

  {
    name:"Sari",
    skill:"Desain Grafis",
    text:"Template Canva yang aku buat akhirnya laku!"
  },

  {
    name:"Budi",
    skill:"Fotografi",
    text:"Sekarang aku dapat job foto produk tiap minggu."
  }

]

export default function CommunityBoard(){

  return(

    <section className="py-16">

      <div className="max-w-4xl mx-auto">

        <h2 className="text-3xl font-bold text-center mb-10">

          Komunitas KaryaNusa

        </h2>

        <div className="space-y-4">

          {posts.map((p,i)=>(
            <div key={i} className="bg-white p-5 rounded-lg shadow">

              <div className="font-semibold">

                {p.name} • {p.skill}

              </div>

              <p className="text-gray-600 mt-2">

                {p.text}

              </p>

            </div>
          ))}

        </div>

      </div>

    </section>

  )
}