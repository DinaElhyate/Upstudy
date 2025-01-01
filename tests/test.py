import time
import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service as ChromeService
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager


class TestHomePage(unittest.TestCase):
    def setUp(self):
        
        self.driver = webdriver.Chrome(service=ChromeService(ChromeDriverManager().install()))
        self.driver.get("http://localhost:3000") 

    def tearDown(self):
        self.driver.quit()

    def test_home_page_title(self):
        """Vérifier que le titre de la page d'accueil est correct."""
        self.assertIn("Upstudy - Education & LMS HTML5 Template", self.driver.title)  

    def test_posts_display(self):
        """Vérifier que les posts sont affichés sur la page."""
        WebDriverWait(self.driver, 10).until(
            EC.visibility_of_element_located((By.CSS_SELECTOR, ".single-course"))
        )
        posts = self.driver.find_elements(By.CSS_SELECTOR, ".single-course")
        self.assertGreater(len(posts), 0, "Aucun post n'est affiché sur la page.")

    def test_post_links_exist(self):
        """Vérifier que les liens vers les détails des posts existent."""
        WebDriverWait(self.driver, 10).until(
            EC.visibility_of_element_located((By.CSS_SELECTOR, ".single-course"))
        )
        posts = self.driver.find_elements(By.CSS_SELECTOR, ".single-course")
        for post in posts:
            link = post.find_element(By.CSS_SELECTOR, "a") 
            self.assertTrue(link.is_displayed(), "Le lien vers le post n'est pas affiché.")
            self.assertTrue(link.is_enabled(), "Le lien vers le post n'est pas cliquable.")

    def test_login(self):
            """Vérifier que la fonctionnalité de connexion fonctionne."""
            self.driver.get("http://localhost:3000/login")

            # Localiser les champs de saisie
            username_input = self.driver.find_element(By.ID, "username")
            password_input = self.driver.find_element(By.ID, "password")
            login_button = self.driver.find_element(By.CSS_SELECTOR, ".form-btn button")

            # Fournir les données de connexion
            username_input.send_keys("dina")
            password_input.send_keys("dina")

            # Soumettre le formulaire
            login_button.click()

            # Attendre la redirection et vérifier l'URL ou un élément de la page d'accueil
            WebDriverWait(self.driver, 10).until(
                EC.url_contains("/h")
            )
            self.assertIn("/h", self.driver.current_url, "L'utilisateur n'a pas été redirigé correctement après la connexion.")
    

    def test_post_redirection(self):
        """Vérifier que cliquer sur un post redirige vers la page de détails du post."""

        try:
            WebDriverWait(self.driver, 10).until(
                EC.visibility_of_element_located((By.CSS_SELECTOR, ".top-meta h3.title a"))
            )

            post = self.driver.find_element(By.CSS_SELECTOR, ".top-meta h3.title a")

            self.driver.execute_script("arguments[0].scrollIntoView({block: 'center'});", post)


            WebDriverWait(self.driver, 10).until(
                EC.element_to_be_clickable((By.CSS_SELECTOR, ".top-meta h3.title a"))
            )

            try:
                post.click()
            except Exception as e:
                self.driver.execute_script("arguments[0].click();", post)

            WebDriverWait(self.driver, 10).until(
                EC.url_contains("/post/")
            )

            current_url = self.driver.current_url
            self.assertIn("/post/", current_url, "La redirection vers la page de détails a échoué.")
            self.assertRegex(current_url, r"/post/\d+", "L'URL ne contient pas l'ID du post.")

        except Exception as e:
            self.driver.save_screenshot("screenshot.png")  # Capture d'écran en cas d'erreur
            print(f"Erreur rencontrée : {e}")
            raise
        
    def test_comments_display(self):
        """Vérifier que les commentaires sont bien affichés sur la page d'un post."""

        # Se connecter pour s'assurer que l'utilisateur est connecté avant de vérifier les commentaires
        self.driver.get("http://localhost:3000/login")
        username_input = self.driver.find_element(By.ID, "username")
        password_input = self.driver.find_element(By.ID, "password")
        login_button = self.driver.find_element(By.CSS_SELECTOR, ".form-btn button")
        username_input.send_keys("dina")
        password_input.send_keys("dina")
        login_button.click()

        # Attendre la redirection vers la page d'accueil après la connexion
        WebDriverWait(self.driver, 10).until(
            EC.url_contains("/h")  # Adapte l'URL de redirection si nécessaire
        )

        # Accéder à la page du post
        self.driver.get("http://localhost:3000/post/3")  # Remplacer par l'ID de ton post

        # Attendre que la section des commentaires soit visible
        WebDriverWait(self.driver, 10).until(
            EC.visibility_of_element_located((By.XPATH, "//div[h4[text()='Comments']]"))
        )

        # Vérifier que les commentaires sont bien affichés
        # Sélecteur pour trouver tous les commentaires sous le div parent
        comments = self.driver.find_elements(By.XPATH, "//div[h4[text()='Comments']]//div[contains(@style, 'margin-bottom: 15px')]")
        print(f"Nombre de commentaires trouvés : {len(comments)}")
        
        self.assertGreater(len(comments), 0, "Aucun commentaire affiché sur la page.")
            
    def test_add_comment(self):
        """Vérifier que l'ajout d'un commentaire fonctionne correctement."""

        # Étape 1 : Se connecter pour s'assurer que l'utilisateur est connecté avant d'ajouter un commentaire
        self.driver.get("http://localhost:3000/login")
        username_input = self.driver.find_element(By.ID, "username")
        password_input = self.driver.find_element(By.ID, "password")
        login_button = self.driver.find_element(By.CSS_SELECTOR, ".form-btn button")
        username_input.send_keys("dina")
        password_input.send_keys("dina")
        login_button.click()

        # Attendre la redirection vers la page d'accueil après la connexion
        WebDriverWait(self.driver, 10).until(
            EC.url_contains("/h")  # Adapte l'URL de redirection si nécessaire
        )

        # Étape 2 : Accéder à la page du post
        self.driver.get("http://localhost:3000/post/3")  # Remplacer par l'ID de ton post

        # Étape 3 : Attendre que la section des commentaires soit visible
        print("Étape 4 : Attente que la section des commentaires soit visible")
        WebDriverWait(self.driver, 10).until(
            EC.visibility_of_element_located((By.XPATH, "//div[h4[text()='Comments']]"))
        )
        print("Section des commentaires visible.")

        # Étape 4 : Ajouter un commentaire
        comment_input = self.driver.find_element(By.XPATH, "//textarea[@placeholder='Add a comment...']")
        comment_input.send_keys("C'est un test.")
        submit_button = self.driver.find_element(By.XPATH, "//button[text()='Post Comment']")
        submit_button.click()

       

    def test_post_details(self):
        """Vérifier que les données sur la page de détails du post sont affichées correctement après connexion."""
        self.driver.get("http://localhost:3000/login")
        username_input = self.driver.find_element(By.ID, "username")
        password_input = self.driver.find_element(By.ID, "password")
        login_button = self.driver.find_element(By.CSS_SELECTOR, ".form-btn button")
        username_input.send_keys("dina")
        password_input.send_keys("dina")
        login_button.click()

        WebDriverWait(self.driver, 10).until(
            EC.url_contains("/h")
        )

        self.driver.get("http://localhost:3000/post/3")
        WebDriverWait(self.driver, 10).until(
            EC.visibility_of_element_located((By.CSS_SELECTOR, ".single"))
        )

        title = self.driver.find_element(By.CSS_SELECTOR, ".single h3")
        self.assertTrue(title.is_displayed(), "Le titre du post n'est pas affiché.")

        description = self.driver.find_element(By.CSS_SELECTOR, ".single p")
        self.assertTrue(description.is_displayed(), "La description du post n'est pas affichée.")

        post_image = self.driver.find_element(By.CSS_SELECTOR, ".single img")
        self.assertTrue(post_image.is_displayed(), "L'image du post n'est pas affichée.")

        author_name = self.driver.find_element(By.CSS_SELECTOR, ".single .user span")
        self.assertTrue(author_name.is_displayed(), "Le nom de l'auteur n'est pas affiché.")

        post_time = self.driver.find_element(By.CSS_SELECTOR, ".single .user p")
        self.assertTrue(post_time.is_displayed(), "Le temps écoulé depuis la publication du post n'est pas affiché.")

        edit_button = self.driver.find_elements(By.CSS_SELECTOR, ".single .edit")
        self.assertGreater(len(edit_button), 0, "Les options de modification et de suppression ne sont pas disponibles pour l'auteur.")

    def test_contact_form_submission(self):
        """Vérifier que le formulaire de contact fonctionne après connexion."""

        # Se connecter à l'application
        self.driver.get("http://localhost:3000/login")

        # Localiser les champs de connexion
        username_input = self.driver.find_element(By.ID, "username")
        password_input = self.driver.find_element(By.ID, "password")
        login_button = self.driver.find_element(By.CSS_SELECTOR, ".form-btn button")

        # Fournir les données de connexion
        username_input.send_keys("dina")
        password_input.send_keys("dina")

        # Soumettre le formulaire de connexion
        login_button.click()

        # Attendre que l'utilisateur soit redirigé vers la page d'accueil ou une autre page après connexion
        WebDriverWait(self.driver, 10).until(
            EC.url_contains("/h")  # Vérifier que l'URL après la connexion contient "/h"
        )

        # Vérifier que l'utilisateur est redirigé correctement après la connexion
        self.assertIn("/h", self.driver.current_url, "L'utilisateur n'a pas été redirigé correctement après la connexion.")

        # Accéder à la page du post
        post_id = 3  # Remplacer par l'ID réel du post que tu veux tester
        self.driver.get(f"http://localhost:3000/post/{post_id}")

        # Localiser le formulaire de contact et les champs
        name_input = self.driver.find_element(By.NAME, "name")
        email_input = self.driver.find_element(By.NAME, "email")
        subject_input = self.driver.find_element(By.NAME, "subject")
        message_input = self.driver.find_element(By.NAME, "message")
        submit_button = self.driver.find_element(By.CSS_SELECTOR, ".contact-form button[type='submit']")

        # Remplir les champs du formulaire
        name_input.send_keys("Test User")
        email_input.send_keys("testuser@example.com")
        subject_input.send_keys("Test Subject")
        message_input.send_keys("This is a test message.")

        # Soumettre le formulaire
        submit_button.click()

if __name__ == "__main__":
    unittest.main()