# upgrade mui4 to mui5
npm install @mui/material @emotion/react @emotion/styled
mui page -> styles(legacy) -> npm install @mui/styles
npm install @mui/icons-material

# mui Theme
κάναμε wrap το _app.js με <ThemeProvider theme={theme}>, όπου στο theme ορίσαμε τα χρώματα - μπορούμε πλέον να ορίσουμε τα χρώματα κεντρικά, και άρα οπουδήποτε να πούμε π.χ. color='primary'

# useRef
στο mui, τα TextField αντί για ref, θέλουν useRef

# menus
List vs Menu
The primary responsibility of the MenuList component is to handle the focus.
The easiest way to add style overrides for a one-off situation is to use the sx prop 

# bugs
1. me lathos password, vgazei 'no such user'
2. to change-password den kanei validation..
3. στη /profile βλέπω Login

# Authorization
Next Auth -> 
    1. create pages/auth folder
    2. create [...nextauth].js & copy API route boilerplate from https://next-auth.js.org/getting-started/example
    3. OAuth: in case of OAuth, create application in delegation provider (δες https://www.youtube.com/watch?v=bNEAnviNdJM)
    *** 4. add React Hooks useSession / getSession να καταγράψω τι έχω κάνει vs documentation!!! ***

# TO DO
    1. να χειριστώ το error όταν κάνω add duplicate product 
    2. το css του error message στο category
    να δω πως θα γίνει με getStaticProps στο component 
    inline Product editing

## Category
    0.1 model
    0.2 κάνω seed 2-3 κατηγορίες - έκανα import json από το compass
    0.3 φτιάχνω την pages/api/categories
    0.4 να φέρει κατηγορίες! 
        - με useEffect σε component -> NAI!
        - με getStaticProps σε component -> δεν φέρνει κατηγορίες-> getStaticProps can only be exported from a page. React needs to have all the required data before the page is rendered.
        - με getStaticProps σε page -> δεν φέρνει κατηγορίες (ΓΙΑΤΙ?) δεν έχω κονσόλα για να δω τι φέρνει
        - με getInitialProps σε page -> φέρνει κατηγορίες!, αλλά είναι page οπότε καταλαμβάνει όλη τη σελίδα - εγώ θέλω component


# Products
    1.1 κάναμε import το utils/products ok
    2.2 να γίνει φιλτράρισμα μόνο τα featured products στην κεντρική σελίδα
    2.3 να κάνουμε κλικ στο προϊόν και να μπαίνουμε στη σελίδα του OK, -> να το προχωρήσω..
    2.4 Να γίνεται edit στην ίδια γραμμή, αλά https://www.youtube.com/watch?v=dYjdzpZv5yc&t=1884s
    3.0 να γίνει το edit της φωτό!!!
    5.0 να φτιάξω τη css του FormHelperText στο select!
    6.0 στο Add να μπει και description
    7.0 στο Edit να μη μπορεί να γίνει delete αν υπάρχει σε products
    8.0 οταν γυρίσει error το mongoose, να γίνεται το handling
  
# Pagination
    Χρησιμοποιώ το mui component
    
# Validation
    Πως χρησιμοποιείται η useForm
    στη φόρμα μας τα πεδία πρέπει να έχουν name & value, έτσι θα τα πάρει η useForm και θα τα 
        . κάνει validate
        . βάλει στο state, μέσω του reducer
    βάζουμε το αρχικό state σε object initialValues
    δηλώνω errors/setErrors useState
    ορίζω τη validate μου για κάθε πεδίο της φόρμας

# 3. Lists
    2.1 τα existing categories να γίνουν memoized για να μην ξανα-render
    2.2 Στις λίστες να μπει pagination / endless scrolling etc.

# 4. Optimization
    0. Lazy loading
    1. Memoization
    2. (Dashboard)

*2. main menu με επιλογές τα links από kleidaras ( αρχική / προφίλ / προϊόντα / υπηρεσίες)
*3. να σχηματιστεί η πρώτη σελίδα από kleidaras
    = Typewriter typewriter-effect/ Carousel react-material-ui-carousel / Νέες παραλαβές (skeleton)
*4. να κάνει add product με φωτό σε cloudinary!
*5. display products -> θα παίξει με τα νέα API routes από το notes
*6. να παίξει το CREATE ACCOUNT στην auth-form
*7. validation στο back-end 

# db
πρώτα φτιάχνουμε την dbConnect (από το crud)
μετά φτιάχνουμε το API των GET & POST (pages/api/admin/categories)
τεστάρουμε με postman
στο dashboard/categories φορτώνουμε τα data με getInitialProps