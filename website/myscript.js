var to_close = []
var skip_close = []

function closer(event) {
    // console.log(event.target)
    for (let i = 0; i < to_close.length; i++) {
        var children = Array.from(to_close[i].getElementsByTagName("*"))

        if (event.target != to_close[i] && !(children.includes(event.target)) && skip_close[i] === false) {

            console.log('removing')
            to_close[i].style.display = 'none';

            if (to_close.length == 0) {
                document.removeEventListener("click", closer);
            }
            // to_close[i] = undefined
            to_close.splice(i, 1);
            skip_close.splice(i, 1)

        }
        if (skip_close[i] === true) {
            skip_close[i] = false
        }
    }
}

function toggleDropdown(element) {

    var parent_elem = element.parentElement

    if (parent_elem.id === 'sort-div' || parent_elem.id === 'sort-content') {

        var dropdownContent = document.querySelector('#sort-content');

        if (dropdownContent.style.display === 'block') {
            dropdownContent.style.display = 'none';
        }
        else {
            dropdownContent.style.display = 'block';

            to_close.push(dropdownContent)
            skip_close.push(true)
            document.addEventListener('click', closer)

        }

    }

    else if (element.id === "filter-toggle") {

        var dropdownContent = document.querySelector('#filter-content');
        // dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';

        if (dropdownContent.style.display === 'block') {
            dropdownContent.style.display = 'none';
        }
        else {
            dropdownContent.style.display = 'block';

            to_close.push(dropdownContent)
            skip_close.push(true)

            document.addEventListener('click', closer)

        }

    }

    else if (element.id === "type-option") {
        // console.log("triggered")
        var sideContent = document.querySelector('#types-div');
        // sideContent.style.display = sideContent.style.display === 'block' ? 'none' : 'block';

        if (sideContent.style.display === 'block') {
            sideContent.style.display = 'none';
        }
        else {
            sideContent.style.display = 'block';

            to_close.push(sideContent)
            skip_close.push(true)

            document.addEventListener('click', closer)

        }
    }

    else if (element.id === "year-option") {
        // console.log("triggered")
        var sideContent = document.querySelector('#years-div');
        // sideContent.style.display = sideContent.style.display === 'block' ? 'none' : 'block';

        if (sideContent.style.display === 'block') {
            sideContent.style.display = 'none';
        }
        else {
            sideContent.style.display = 'block';

            to_close.push(sideContent)
            skip_close.push(true)

            document.addEventListener('click', closer)

        }
    }


    else if (element.id === "course-option") {
        // console.log("triggered")
        var sideContent = document.querySelector('#courses-div');
        // sideContent.style.display = sideContent.style.display === 'block' ? 'none' : 'block';

        if (sideContent.style.display === 'block') {
            sideContent.style.display = 'none';
        }
        else {
            sideContent.style.display = 'block';

            to_close.push(sideContent)
            skip_close.push(true)

            document.addEventListener('click', closer)

        }
    }

    else if (element.id === "college-option") {
        // console.log("triggered")
        var sideContent = document.querySelector('#colleges-div');
        // sideContent.style.display = sideContent.style.display === 'block' ? 'none' : 'block';

        if (sideContent.style.display === 'block') {
            sideContent.style.display = 'none';
        }
        else {
            sideContent.style.display = 'block';

            to_close.push(sideContent)
            skip_close.push(true)

            document.addEventListener('click', closer)

        }
    }

    else if (element.className === 'types-div-p') {

        if (!(element.innerHTML.includes('✅'))) {

            selected_types.push(element.innerHTML)
            element.innerHTML = '✅  ' + element.innerHTML
            console.log(selected_types)
        }
        else {

            element.innerHTML = element.innerHTML.replace('✅', '').trim();
            const index = selected_types.indexOf(element.innerHTML);
            if (index > -1) {
                selected_types.splice(index, 1);
            }
        }

    }

    else if (element.className === 'years-div-p') {

        if (!(element.innerHTML.includes('✅'))) {

            selected_years.push(element.innerHTML)
            element.innerHTML = '✅  ' + element.innerHTML
            console.log(selected_years)
        }
        else {

            element.innerHTML = element.innerHTML.replace('✅', '').trim();
            const index = selected_years.indexOf(element.innerHTML);
            if (index > -1) {
                selected_years.splice(index, 1);
            }
        }

    }

    else if (element.className === 'courses-div-p') {

        if (!(element.innerHTML.includes('✅'))) {

            selected_courses.push(element.innerHTML)
            element.innerHTML = '✅  ' + element.innerHTML
            console.log(selected_courses)
        }
        else {

            element.innerHTML = element.innerHTML.replace('✅', '').trim();
            const index = selected_courses.indexOf(element.innerHTML);
            if (index > -1) {
                selected_courses.splice(index, 1);
            }
        }

    }

    else if (element.className === 'colleges-div-p') {

        if (!(element.innerHTML.includes('✅'))) {

            selected_colleges.push(element.innerHTML)
            element.innerHTML = '✅  ' + element.innerHTML
            console.log(selected_colleges)
        }
        else {

            element.innerHTML = element.innerHTML.replace('✅', '').trim();
            const index = selected_colleges.indexOf(element.innerHTML);
            if (index > -1) {
                selected_colleges.splice(index, 1);
            }
        }

    }


    if (element.className === 'option-tag') {
        var dropdownButton = parent_elem.parentElement.querySelector('.dropdown-toggle');
        var text_part = element.querySelector('span');
        dropdownButton.innerHTML = text_part.innerHTML + " ▼"

        if (parent_elem.id === 'sort-content') {
            selected_sort = text_part.innerHTML
        }
        else if (parent_elem.id === 'filter-content') {
            selected_filter = text_part.innerHTML
        }
    }


}


function genTags(data, elementId) {
    courses_div_elem = document.getElementById(elementId)

    for (let i in data) {
        var new_elem = document.createElement("p");

        new_elem.setAttribute("onclick", "toggleDropdown(this)")
        new_elem.setAttribute("class", elementId + "-p");
        new_elem.innerHTML = data[i]
        courses_div_elem.appendChild(new_elem);
    }
}

var courses = [
    "Aeronautical Engineering",
    "Applied Electronics & Instrumentation",
    "Architecture",
    "Artificial Intelligence",
    "Artificial Intelligence and Data Science",
    "Artificial Intelligence and Machine Learning",
    "Automobile Engineering",
    "B.Pharm",
    "B.Tech Agriculture Engineering",
    "B.Tech. (Agricultural Engg.)",
    "Bio Medical Engineering",
    "Bio Technology",
    "Bio Technology and Biochemical Engg.",
    "Block Chain",
    "Chemical Engineering",
    "Civil Engineering",
    "Civil and Environmental Engineering",
    "Computer Engineering",
    "Computer Engineering and Application",
    "Computer Science & Design",
    "Computer Science & Engg. (Artificial Intelligence & Machine Learning)",
    "Computer Science & Engineering",
    "Computer Science & Engineering (Artificial Intelligence and Data Science)",
    "Computer Science & Engineering (Artificial Intelligence and Machine Learning)",
    "Computer Science & Engineering (Artificial Intelligence)",
    "Computer Science & Engineering (Data Science)",
    "Computer Science and Business Systems",
    "Computer Science and Engineering (Block Chain)",
    "Computer Science and Engineering (Cyber Security)",
    "Computer Science and Engineering (Internet of Things and Cyber Security including Block Chain Technology",
    "Computer Science and Engineering (Internet of Things)",
    "Computer Science and Engineering and Business Systems",
    "Cyber Security",
    "Dairy Technology.",
    "Electrical & Electronics Engineering",
    "Electrical and Computer Engineering",
    "Electronics & Biomedical Engineering",
    "Electronics & Communication Engineering",
    "Electronics & Instrumentation",
    "Electronics and Computer Engineering",
    "Food Technology",
    "Industrial Engineering",
    "Information Technology",
    "Instrumentation & Control Engg.",
    "Mechanical (Production Engg.)",
    "Mechanical Engg. (Automobile)",
    "Mechanical Engineering",
    "Mechatronics Engineering",
    "Metallurgical and Materials Engineering",
    "Naval Arch. & Ship Building",
    "Polymer Engineering",
    "Printing Technology",
    "Production Engineering",
    "Robotics & Automation",
    "Robotics and Artificial Intelligence",
    "Safety & Fire Engineering"
]

var colleges = [
    "College of Engineering,Thiruvananthapuram.",
    "Govt. Engineering College,Thrissur.",
    "T K M College of Engineering, Kollam.",
    "Model Engineering College, Thrikkakkara.",
    "M A College of Engineering, Kothamangalam.",
    "Govt. Rajiv Gandhi Institute of Tech., Kottayam.",
    "Govt. College of Engineering, Kannur.",
    "Govt. Engineering College, Sreekrishnapuram.",
    "N S S College of Engineering, Palakkad.",
    "S C T College of Engineering, Pappanamcode, TVPM",
    "Rajagiri School of Engineering and Technology, Kochi.",
    "College of Engineering, Chengannur, Alappuzha.",
    "Muthoot Institute of Tech. & Science, Puthencurz,",
    "Christ College of Engineering, Irinjalakuda.",
    "Federal Institute of Science & Tech., Angamaly.",
    "College of Engineering, Adoor",
    "LBS Institute of Tech. for Women, Poojapura, TVPM",
    "Mar Baselious College of Engg. & Tech.,",
    "College of Engineering, Attingal, Thiruvananthapuram.",
    "Saintgits College of Engineering, Kottayam",
    "College of Engineering, Thalassery, Kannur.",
    "LBS College of Engineering, Kasaragod.",
    "Amal Jyothi College of Engineering, Koovapally, Kanjirapally",
    "St. Josephs College of Engineering and Technology,Palai.",
    "SCMS School of Engg. & Tech., Ernakulam",
    "College of Engineering, Kallooppara.",
    "Viswajyothi College of Engg. & Technology,Vazhakulam.",
    "College of Engineering, Vadakara, Kozhikode.",
    "College of Engineering Perumon.",
    "University College of Engineering, Kariavattom.",
    "College of Engineering, Cherthala, Alappuzha.",
    "Sahrdaya College of Engineering and Technology, Kodakara.",
    "M E S College of Engineering, Kuttippuram.",
    "Adi Sankara Institute of Engg. & Tech., Kalady, Ernakulam.",
    "Vidya Academy of Science & Technology, Thrissur.",
    "Jyothi Engineering College, Cheruthuruthy.",
    "College of Engineering, Munnar.",
    "Marian Engineering College, Kazhakuttom.",
    "College of Engineering, Thrikarippur, Kasaragod.",
    "M E A Engineering College, Malappuram.",
    "College of Engineering, Kidangoor.",
    "College of Engineering, Muttathara.",
    "T K M Institute of Technology, Ezhukone, Kollam.",
    "Toc H Institute of Science & Tech., Ernakulam",
    "College of Engineering, Karunagappally.",
    "College of Engineering & Management, Punnapra.",
    "University College of Engineering,Thodupuzha.",
    "Albertian Institute of Science and Technology, Kalamassery.",
    "Vimal Jyothi Engineering College, Chemperi.",
    "Carmel College of Engg. & Technology, Punnapra,",
    "College of Engineering, Pathanapuram.",
    "College of Engineering, Kottarakkara, Kollam.",
    "Mar Baselios Institute of Technology & Science,",
    "K M E A Engineering College, Edathala.",
    "College of Engineering, Aranmula, Pathanamthitta.",
    "College of Engineering, Poonjar.",
    "KMCT College of Engineering, Kozhikkode.",
    "Christ Knowledge City, Kuzhoor,EKM",
    "Jawaharlal College of Engineering & Technology,",
    "Rajadhani Institute of Engineering & Tech., Attingal.",
    "Sree Buddha College of Engineering, Nooranadu.",
    "ICCS College of Engineering and Management, Thrissur",
    "Mar Baselios Christian College of Engg. & Tech., Peermede.",
    "Sree Narayana Gurukulam College of Engineering,",
    "AWH Engineering College, Kozhikkode",
    "Nehru College of Engg. & Research Centre, Thiruvillwamala.",
    "Ahalia School of Engineering & Technology, Pudussery,",
    "M Dasan Institute of Technology, Koyilandy.",
    "Sree Narayana Guru College of Engg & Technology,",
    "Royal College of Engineering & Technology, Thrissur.",
    "I E S College of Engineering, Chittilappilly.",
    "Universal Engineering College, Vallivattom, Thrissur.",
    "Sreepathy Institute of Management & Tech., Koottanad.",
    "KMCT College of Engineering for Women, Manassery.",
    "Providence College of Engineering, Chengannur.",
    "VISAT Engineering College, Piravam, EKM.",
    "UKF College of Engineering & Tech., Parippally.",
    "MES College of Engineering & Technology, .Ernakulam.",
    "St. Thomas College of Engineering & Technology, Kannur.",
    "Mangalam College of Engineering, Ettumanoor.",
    "Eranad Knowledgecity Technical Campus, Cherukulam,",
    "Lourdes Matha College of Science and Technology,",
    "Vidya Academy of Science & Technology, Kilimanoor.",
    "Thejus Engineering College, Erumapetti, Thrissur.",
    "Baselios Mathew II College of Engg., Sasthamcotta, Kollam.",
    "Mohandas College of Engg. & Tech., Nedumangad, TVM",
    "Al-Azhar College of Engineering & Technology, Thodupuzha.",
    "Indira Gandhi Inst. of Engineering & Tech., Kothamangalam",
    "Rajadhani Institute of Science and Technology, Palakkad",
    "Ilahia College of Engineering & Tech., Moovattupuzha.",
    "Sarabhai Institute of Science & Technology, Vellanad.",
    "St. Thomas College of Engg. & Technology, Chengannur.",
    "Sree Narayana Mangalam Inst. of Mgmt. & Tech.,",
    "Nirmala College of Engineering, Chalakudy.",
    "P A Aziz College of Engineering, Karakulam,",
    "Malabar Institute of Technology, Anjarakandi.",
    "Mahaguru Institute of Technology, Mavelikkara, Alappuzha",
    "Veda Vyasa Institute of Technology, Ponnempadam,",
    "MES Institute of Tech. & Management, Chathannoor.",
    "Sree Narayana Guru Institute of Science & Tech., N.",
    "Met's School of Engineering, Mala.",
    "M G College of Engineering, Thiruvallom.",
    "Holy Grace Academy of Engineering, Mala, Thrissur.",
    "John Cox Memorial CSI Institute of Technology,",
    "Valia Koonambaikulathamma College of Engg. & tech.,",
    "Jai Bharath College of Management & Engg. Tech.,",
    "MGM College of Engineering & Technology, Ernakulam",
    "Younus College of Engg. & Technology, Vadakkevila, Kollam",
    "St. Thomas Institute of Science & Technology, Kattaikonam.",
    "Heera College of Engineering & Technology, Nedumangad.",
    "KVM College of Engineering and Information Technology,",
    "Travancore Engineering College, Oyoor, Kollam.",
    "Malabar College of Engineering & Tech., Wadakancherry.",
    "Musaliar College of Engineering & Tech., Pathanamthitta.",
    "Kottayam Institute of Tech. & Science, Pallicathode,",
    "Sree Buddha College of Engineering, Elavumthitta,",
    "Layola Institute of Science and Technology,East Kodaly,",
    "Mount Zion College of Engg., Pathanamthitta.",
    "MGM College of Engineering and Pharmaceutical Sciences,",
    "Gurudeva Institute of Science & Technology, Puthuppally.",
    "Mount Zion Institute of Science & Tehnology, Chengannur",
    "Muslim Association College of Engineering, Venjaramoodu.",
    "Musaliar College of Engineering, Chirayinkeezh.",
    "Toms College of Engineering, Mattakara, Kottayam",
    "Shahul Hameed Memorial Engineering College, Kadakkal,",
    "Engineering College, Idukki",
    "Govt. Engineering College, Mananthavady.",
    "College of Pharmaceutical Sciences, Kozhikkode",
    "College of Pharmaceutical Sciences, Thiruvananthapuram",
    "College of Pharmaceutical Sciences, Alappuzha",
    "College of Pharmaceutical Sciences, Kottayam",
    "College of Pharmaceutical Science, Kannur",
    "JDT Islam College of Pharmacy, Marikunnu, Kozhikode",
    "Al Shifa College of Pharmacy, Poonthavanam, Kizhattur,",
    "Ahalia School of Pharmacy, Kozhipara, Palakkad",
    "KMCT College of Pharmaceutical Sciences, Kalanthode, Kozhikode",
    "Devaki Amma Memorial College of Pharmacy, Pulliparamba,",
    "Moulana College of Pharmacy, Nr. Railway Station, Perinthalmanna,",
    "Jamia Salafiya Pharmacy College, Salafiya Gramam, Pulikkal,",
    "Department of Pharmaceutical Science, Ettumanoor",
    "Pushpagiri College of Pharmacy, Perumthuruthy, Thiruvalla",
    "College of Pharmacy, Kannur Medical College, Anajarakandy,",
    "Mar Dioscorus College of Pharmacy, Alathara, Sreekaryam, TVPM",
    "National College of Pharmacy, Manassery, Mukkam, Kozhikode",
    "Ezhuthachan College of Pharmaceutical Science, Marayamuttam,",
    "Nirmala College of Pharmacy, Muvattupuzha, Ernakulam",
    "Chemists College of Pharmaceutical Scie.&Research, Varikoli,",
    "DM WIMS College of Pharmacy, Wayanad",
    "Department of Pharmaceutical Science, Puthuppally, Kottayam",
    "St. Joseph\u2019s College of Pharmacy, Cherthala, Alappuzha",
    "Al-Azhar College of Pharmacy, Thodupuzha",
    "Crescent College of Pharmaceutical Sciences, Madayipara, Kannur",
    "St. James College of Pharmaceutical Sciences, River Bank,",
    "Grace College of Pharmacy, Kodunthirapully, Palakkad",
    "Nehru College of Pharmacy, Pampady, Thiruvilwamala, Thrissur",
    "Westfort College of Pharmacy, Thrissur",
    "The Dale View College of Pharmacy & Research Centre, Punalal,",
    "Elims College of Pharmacy, Ramavarmapuram, Thrissur.",
    "Karuna College of Pharmacy, Thirumittacode, Pattambi, Palakkad",
    "K T N College of Pharmacy, Puliyanamkunnu, Ottappalam , Palakkad",
    "Dr. Joseph Mar Thoma Institute of Pharmaceutical Scie. &",
    "Sree Krishna College of Pharmacy & Research Centre, Parassala,",
    "Mount Zion College of Pharmaceutical Science and Research, Adoor",
    "Nazareth College of Pharmacy, Othera, Thiruvalla, Pathanamthitta",
    "Triveni Institute of Pharmacy, Kecheri, Thrissur",
    "Rajiv Gandhi Institute of Pharmacy, Trikaripur,Kasaragod",
    "Mookambika College of Pharmaceutical Scie. & Research,",
    "Hindustan College of Pharmacy, Kanjirappally",
    "Malik Deenar College of Pharmacy, Seethangoli, Bela, Kasaragod",
    "Prime College of Pharmacy, Erattayil, Palakkad",
    "Sanjoe College of Pharmaceutical Studies, Kuzhalmannam, Palakkad",
    "St. John's College of Pharmaceutical Scie. & Research, Kattapana,",
    "Govt. Engineering College, Kozhikkode.",
    "P A Aziz College of Engineering, Karakulam, Thiruvananthapuram",
    "Kelappaji College of-Agrl. Engg. & Technology, Tavanur.",
    "PRS College of Engineering & Tech., Neyyattinkara.",
    "ILM College of Engineering, Perumbavoor, Ernakulam.",
    "Sree Narayana Guru Institute of Science & Tech., N. Paravoor.",
    "Ace College of Engineering, .Thiruvallam.",
    "Jawaharlal College of Engineering & Technology, Ottappalam.",
    "Kottayam Institute of Tech. & Science, Pallicathode, Kottayam.",
    "Govt. Engineering College, Barton Hills, TVM",
    "Muthoot Institute of Tech. & Science, Puthencurz, Ernakulam.",
    "Mar Baselious College of Engg. & Tech., Thiruvananthapuram.",
    "Bishop Jerome Institute, Kollam.",
    "Carmel College of Engg. & Technology, Punnapra, Alappuzha.",
    "College of Engineering and Technology, Payyannur, Kannur.",
    "Eranad Knowledgecity Technical Campus, Cherukulam, Manjeri",
    "Ahalia School of Engineering & Technology, Pudussery, Palakkad.",
    "Sree Narayana Guru College of Engg & Technology, Payyannur.",
    "Sree Narayana Institute of Technology, Adoor",
    "Toc H Institute of Science & Tech., Mulamthurutthy.",
    "Mar Baselios Institute of Technology & Science, Kothamangalam.",
    "M Dasan Memmorial Co-op. Inst. of Engg. & Inf. Tech., Koyilandy.",
    "Valia Koonambaikulathamma College of Engg. & tech., Parippally.",
    "Sadguru Swamy Nithyananda Insti. of Tech., Karsaragod",
    "Lourdes Matha College of Science and Technology, Kuttichal.",
    "Al-Ameen College of Engineering, Pattambi.",
    "Veda Vyasa Institute of Technology, Ponnempadam, Malappuram.",
    "Trinity College of Engg, Neruvamoodu, Thiruvananthapuram.",
    "Toms College of Engg. for Startups, Mattakara, Kottayam.",
    "Sree Narayana Gurukulam College of Engineering, Kolencherry.",
    "Sree Buddha College of Engineering, Elavumthitta, Pathanamthitta",
    "Vijnan Institute of Science & Technology, Piravam.",
    "Axis College of Engineering & Technology, Murikkingal, Thrissur.",
    "Jai Bharath College of Management & Engg. Tech., Perumbavoor.",
    "Sree Narayana Mangalam Inst. of Mgmt. & Tech., Moothakunnam.",
    "Shahul Hameed Memorial Engineering College, Kadakkal, Kollam",
    "KVM College of Engineering and Information Technology, Cherthala.",
    "Mentor Academy for Design Entrepreneurship & Tech., Ernakulam",
    "College of Dairy Science & Tech., Mannuthy, Thrissur",
    "College of Dairy Science & Tech., Pookode Campus, Wayanad.",
    "College of Dairy Science & Tech., Karakulam P O, TVM.",
    "College of Dairy Science & Tech., Idukki",
    "Calicut Unity. Institute of Engineering & Tech., Tenhipalam.",
    "College of Food Technolgy, Thumburmuzhy",
    "School of Ocean Engg. & Underwater Tech., KUFOS, Panangad",
    "Holy Grace Academy of Pharmacy, Mala,Thrissur",
    "K V M College of Pharmacy, Kokkothamangalam, Cherthala",
    "KMP College of Pharmacy, Perumbavoor, Ernakulam",
    "Sree Buddha College of Engineering, Nooranadu, Padanilam,",
    "MES School of Architecture, Kuttippuram, Malappuram",
    "College of Architecture Trivandrum, Thiruvananthapuram.",
    "Avani Institute of Design, Kozhikkode.",
    "TKM School of Architecture, Ezhukone, Kollam.",
    "IES College of Architecture. Chittilappilly.",
    "SCMS School of Architecture, Ernakulam",
    "A P J Abdul Kalam School of Architecture, Muvattupuzha, Ernakulam",
    "MES College of Architecture, Kakkodi.",
    "Bishop Jerome Institute School of Architecture, Kollam",
    "Marian College of Architecture & Planning, Kazhakuttom.",
    "Devaki Amma's Guruvayurappan College of Architecture,",
    "K M E A College of Architecture, Aluva.",
    "Asian School of Architecture and Design Innovations, Vyttila.",
    "Alsalama Institute of Architecture, Perinthalmanna",
    "Eranad Knowledge City College of Architecture, Manjeri,",
    "DC School of Architecture and Design, Pullikkanam.",
    "Mangalam School of Architecture, Kottayam.",
    "KMCT College of Architecture, Kozhikkode.",
    "Holy Crescent College of Architecture, Vazhakulam.",
    "Thejus College of Architecture, Erumapetti.",
    "Nehru College of Architecture, Lakkidi, Palakkad.",
    "KMCT College of Architecture, Manassery, Kozhikkode.",
    "Nizar Rahim and Mark School of Architecture, Kollam.",
    "Veda Vyasa College of Architecture, Ponnempadam, Malappuram.",
    "Global Institute of Architecture, Pathiripala, Palakkad.",
    "School of Architecture, Eatappilly.",
    "Talent Institute of Architecture, Edappal.",
    "Sneha College of Architecture, Govindapuram,.",
    "KMCT College of Pharmacy, Mampra, Malappuram",
    "Caritas College of Pharmacy, Thellakom, Kottayam",
    "Nirmala College of Health Science, Meloor, Thrissur",
    "MGM Silver Jubilee College of Pharmacy, Kilimannoor,",
    "MGM Silver Jubilee College of Polytech & Pharmaceutical,",
    "KMCT College of Pharmaceutical Sciences, Kalanthode,",
    "Chemists College of Pharmaceutical Scie.&Research,",
    "Moulana College of Pharmacy, Nr. Railway Station,",
    "Cochin College of Engineering & Technology,Valanchery",
    "Ezhuthachan College of Pharmaceutical Science,",
    "Mar Dioscorus College of Pharmacy, Alathara, Sreekaryam,",
    "National College of Pharmacy, Manassery, Mukkam,",
    "Crescent College of Pharmaceutical Sciences, Madayipara,",
    "Sree Krishna College of Pharmacy & Research Centre,",
    "Mount Zion College of Pharmaceutical Science and",
    "Nehru College of Pharmacy, Pampady, Thiruvilwamala,",
    "Karuna College of Pharmacy, Thirumittacode, Pattambi,",
    "The Dale View College of Pharmacy & Research Centre,",
    "MGM College of Pharmacy, Vilayancode, Kannur",
    "K T N College of Pharmacy, Puliyanamkunnu, Ottappalam ,",
    "Nazareth College of Pharmacy, Othera, Thiruvalla,",
    "St. John's College of Pharmaceutical Scie. & Research,",
    "Sanjoe College of Pharmaceutical Studies, Kuzhalmannam,",
    "Malik Deenar College of Pharmacy, Seethangoli, Bela,",
    "Trinity College of Engg, Neruvamoodu,",
    "Axis College of Engineering & Technology, Murikkingal,",
    "M Dasan Memmorial Co-op. Inst. of Engg. & Inf. Tech.,",
    "College of Dairy Science & Tech., Pookode Campus,",
    "School of Ocean Engg. & Underwater Tech., KUFOS,",
    "A P J Abdul Kalam School of Architecture, Muvattupuzha,",
    "D C School of Architecture & Design, Trivandrum",
    "Veda Vyasa College of Architecture, Ponnempadam,",
    "School of Architecture, Mookambika Technical Campus,",
    "Department of Pharmaceutical Science, Puthuppally,",
    "Kerala Academy of Pharmacy, Kandala, Thiruvananthapuram",
    "SEED - APJ Abdul Kalam School of Environmental Design,",
    "College of Dairy Science & Tech., Kaimanam, TVM.",
    "Verghese Kurien Institute of Dairy and Food Technology,",
    "KMCT College of Engineering for Emerging Technology,",
    "Mentor Academy for Design Entrepreneurship & Tech.,"
]

var years = ['2020', '2021', '2022']
var types = ['Government (G)', 'Semi (N)', 'Private/Self-financed (S)']

var selected_courses = []
var selected_colleges = []
var selected_years = []
var selected_types = []

var selected_sort = 'Rank'
var selected_filter = '-- None --'

genTags(types, "types-div")
genTags(years, "years-div")
genTags(courses, "courses-div")
genTags(colleges, "colleges-div")

function addBreak() {
    var br_tr = document.createElement("tr");
    var br_elem = document.createElement("br");
    br_tr.style.background = '#FFFFFF'
    br_tr.appendChild(br_elem)

    table.appendChild(br_tr)
}

function genTable(main_data) {

    table = document.querySelector('#main-table');
    table.textContent = '';

    for (let year in main_data) {

        addBreak()
        addBreak()
        addBreak()
        addBreak()
        var year_tr = document.createElement("tr");
        var year_th = document.createElement("th");

        year_th.innerHTML = "Year " + year
        year_th.setAttribute('colspan', '4')
        year_th.style.textAlign = 'center'
        year_th.style.background = '#333'
        year_th.style.color = '#ffffff'

        year_tr.appendChild(year_th)

        table.appendChild(year_tr)

        for (let allotment_i in main_data[year]) {

            addBreak()
            addBreak()
            var allotment_tr = document.createElement("tr");
            var allotment_th = document.createElement("th");

            allotment_th.innerHTML = 'Allotment - ' + String((parseInt(allotment_i) + 1))
            allotment_th.setAttribute('colspan', '4')
            allotment_th.style.textAlign = 'center'

            allotment_tr.appendChild(allotment_th)

            table.appendChild(allotment_tr)

            for (let course in main_data[year][allotment_i]) {

                addBreak()

                var course_tr = document.createElement("tr");
                var course_th = document.createElement("th");
                course_th.innerHTML = course
                course_th.setAttribute('colspan', '4')
                course_tr.appendChild(course_th)

                table.appendChild(course_tr)

                for (let row_i in main_data[year][allotment_i][course]) {

                    current_row = main_data[year][allotment_i][course][row_i]

                    if (parseInt(row_i) == 0) {
                        headers = ['College code', 'College name', 'Type', 'General Rank']
                        var row_header_tr = document.createElement("tr");
                        for (i in headers) {
                            var row_header_td = document.createElement("th");
                            row_header_td.innerHTML = headers[i]
                            row_header_tr.appendChild(row_header_td)
                        }
                        table.appendChild(row_header_tr)
                    }

                    var row_tr = document.createElement("tr");

                    for (let cell_i in current_row) {

                        var cell_td = document.createElement("td");
                        cell_td.innerHTML = current_row[cell_i]
                        row_tr.appendChild(cell_td)
                    }
                    table.appendChild(row_tr)

                }
            }
        }

    }


}

function refreshData() {
    var option_params = ['none']

    if (selected_filter === 'Type') {
        option_params = selected_types
    }
    else if (selected_filter === 'Year') {
        option_params = selected_years
    }
    else if (selected_filter === 'Courses') {
        option_params = selected_courses
    }
    else if (selected_filter === 'Colleges') {
        option_params = selected_colleges
    }

    option_params = option_params.join('~')
    console.log(option_params)
    query_params = { sort_option: selected_sort, filter_option: selected_filter, acceptables: option_params }
    path = 'http://192.168.1.3:8000/data_endpoint'
    url_path = path + '?' + new URLSearchParams(query_params)
    console.log(url_path)
    loadData(url_path)
}

function loadData(path) {
    fetch(path)
        .then(response => response.json())
        .then(data => {
            genTable(data);
        })
}

loadData('/website/data.json')