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
        


if __name__ == "__main__":
    unittest.main()