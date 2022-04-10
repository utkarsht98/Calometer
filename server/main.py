from tkinter import N
from unicodedata import category
import pymysql
from utils.app import app
from flask import flash, request, jsonify
from utils.config import mysql_instance

@app.route('/addUser', methods=['POST'])
def create_user():
    try:
        _params = request.json
        _username = _params['username']
        _email_id = _params['email_id']
        _password = _params['password']
        _calorie_settings = _params['calorie_settings']
        
        # insert record in database
        userQuery = "INSERT INTO user(username, email_id, password, calorie_settings) VALUES(%s, %s, %s, %s)"
        data = (_username, _email_id, _password, _calorie_settings)

        conn = mysql_instance.connect()
        cursor = conn.cursor()

        cursor.execute(userQuery, data)
        conn.commit()

        res = jsonify('User created successfully.')
        res.status_code = 200
        return res

    except Exception as e:
        print('Error----', e)
    finally:
        cursor.close() 
        conn.close()

@app.route('/getUser', methods=['POST'])
def get_user():
    try:
        _params = request.json
        _username = _params['username']
        _password = _params['password']

        validateQuery = "SELECT password from user where username=%s"
        userQuery = "SELECT id,username,email_id,calorie_settings from user WHERE username=%s"
        userData = (_username)

        conn = mysql_instance.connect()
        cursor = conn.cursor(pymysql.cursors.DictCursor)

        cursor.execute(validateQuery,userData)
        row = cursor.fetchone()

        # print('row======', row)
        if row == None or _password != row['password']:
            res = jsonify("Either Username or Password is incorrect!")
            res.status = 404
        else:
            cursor.execute(userQuery,userData)
            user_data = cursor.fetchone()

            res = jsonify(user_data)
            res.status = 200
        return res
    except Exception as e:
        print('Error----', e)
    finally:
        cursor.close() 
        conn.close()

@app.route('/addFood', methods=['POST'])
def add_food():
    try:
        _params = request.json
        _meal_name = _params['meal_name']
        _calories = _params['calories']
        
        # insert record in database
        FoodQuery = "INSERT INTO food_category(meal_name, calories) VALUES(%s, %s)"
        data = (_meal_name, _calories)

        conn = mysql_instance.connect()
        cursor = conn.cursor()

        cursor.execute(FoodQuery, data)
        conn.commit()

        res = jsonify('User created successfully.')
        res.status_code = 200
        return res

    except Exception as e:
        print('Error----', e)
    finally:
        cursor.close() 
        conn.close()

@app.route('/addMeal', methods=['POST'])
def add_meal():
    try:
        _params = request.json
        _username = _params['username']
        _quantity = _params['quantity']
        _food_name = _params['food_name']
        
        foodIdQuery = "SELECT category_id, calories FROM food_category WHERE meal_name=%s"
        userIdquery = "SELECT id FROM user WHERE username=%s"
        insertMealQuery = "INSERT INTO meals(quantity, total_calories, food_id, user_id) VALUES(%s, %s, %s, %s)"

        foodData = (_food_name)
        userData = (_username)

        conn = mysql_instance.connect()
        cursor = conn.cursor()

        cursor.execute(foodIdQuery, foodData)
        food_row = cursor.fetchone()

        cursor.execute(userIdquery, userData)
        user_row = cursor.fetchone()

        # Add the meal to the meals_table
        _total_calories = food_row[1]*_quantity        
        mealData = (_quantity, _total_calories, food_row[0], user_row)

        cursor.execute(insertMealQuery, mealData)
        conn.commit()

        res = jsonify('User created successfully.')
        res.status_code = 200
        return res

    except Exception as e:
        print('Error----', e)
    finally:
        cursor.close() 
        conn.close()

@app.route('/getMeals/<string:username>', methods=['GET'])
def get_meals(username):
    try:
        # _params = request.json
        # _username = _params['username']

        mealQuery = "SELECT A.meals_id, B.meal_name, A.quantity, A.total_calories, A.entry_time " + \
        "FROM meals A JOIN food_category B ON B.category_id = A.food_id WHERE A.user_id=(SELECT id FROM user WHERE username=%s) ORDER BY A.meals_id ASC"
        
        conn = mysql_instance.connect()
        cursor = conn.cursor(pymysql.cursors.DictCursor)

        cursor.execute(mealQuery, (username))  #Using the retrieved user id to get the meals data
        rows = cursor.fetchall()

        # print('rows---',rows)
        if len(rows) == 0:
            res = jsonify("Sorry!!No meal added by you!!")
            res.status = 404
        else:
            res = jsonify(rows)
        return res
    except Exception as e:
        print('Error----', e)
    finally:
        cursor.close() 
        conn.close()

@app.route('/getFood', methods=['GET'])
def get_food():
    try:
        conn = mysql_instance.connect()
        cursor = conn.cursor(pymysql.cursors.DictCursor)

        cursor.execute("SELECT * FROM food_category")
        rows = cursor.fetchall()

        res = jsonify(rows)
        res.status_code = 200

        return res
    except Exception as e:
        print(e)
    finally:
        cursor.close() 
        conn.close()

@app.route('/deleteAllMeal', methods=['DELETE'])
def delete_all_meal():    
    try:
        _params = request.json
        _username = _params['username']

        conn = mysql_instance.connect()
        cursor = conn.cursor()
        cursor.execute("DELETE FROM meals WHERE user_id=(SELECT id from user where username=%s)", (_username))
        conn.commit()

        res = jsonify('All Meals deleted successfully.')
        res.status_code = 200
        return res

    except Exception as e:
        print(e)
    finally:
        cursor.close() 
        conn.close()

@app.route('/deleteMeal/<int:meal_id>', methods=['DELETE'])
def delete_meal(meal_id):    
    try:
        conn = mysql_instance.connect()
        cursor = conn.cursor()

        cursor.execute("DELETE FROM meals WHERE id=%s", (meal_id))
        conn.commit()

        res = jsonify('Meals deleted successfully.')
        res.status_code = 200
        return res
    except Exception as e:
        print(e)
    finally:
        cursor.close() 
        conn.close()

@app.route('/updateMeal', methods=['PUT'])
def update_meal():
    try:
        _json = request.json
        _meal_id = _json['meal_id']
        _quantity = _json['quantity']
        _food_name = _json['meal_name']
        _username = _json['username']
        
        food_query = "SELECT category_id, calories FROM food_category where meal_name=%s"
        food_data = (_food_name)

        # update record in database
        update_meal_query = "UPDATE meals SET quantity=%s, total_calories=%s, food_id=%s, user_id=(SELECT id FROM user where username=%s) WHERE meals_id=%s"
        
        conn = mysql_instance.connect()
        cursor = conn.cursor()

        cursor.execute(food_query, food_data)
        rows = cursor.fetchone()

        _total_calories = rows[1]*_quantity # Caluclating total calories
        meal_data = (_quantity, _total_calories, rows[0], _username, _meal_id)

        cursor.execute(update_meal_query, meal_data)
        conn.commit()

        res = jsonify('Meal updated successfully.')
        res.status_code = 200

        return res
        # else:
        #     return not_found()
    except Exception as e:
        print(e)
    finally:
        cursor.close() 
        conn.close()

@app.route('/deleteFood/<int:category_id>', methods=['DELETE'])
def delete_food(category_id):
    try:
        conn = mysql_instance.connect()
        cursor = conn.cursor()

        cursor.execute("DELETE FROM food_category WHERE category_id=%s", (category_id))
        conn.commit()

        res = jsonify('Food deleted successfully.')
        res.status_code = 200
        return res
    except Exception as e:
        print(e)
    finally:
        cursor.close() 
        conn.close()

@app.route('/updateFood', methods=['PUT'])
def update_food():
    try:
        _json = request.json
        _meal_id = _json['category_id']
        _food_name = _json['meal_name']
        _calories = _json['calories']

        update_food_query = "UPDATE food_category SET meal_name=%s, calories=%s WHERE category_id=%s"
        food_data = (_food_name, _calories, _meal_id)
        
        conn = mysql_instance.connect()
        cursor = conn.cursor()

        cursor.execute(update_food_query, food_data)
        conn.commit()

        res = jsonify('Food updated successfully.')
        res.status_code = 200

        return res
        # else:
        #     return not_found()
    except Exception as e:
        print(e)
    finally:
        cursor.close() 
        conn.close()

@app.errorhandler(404)
def not_found(error=None):
    message = {
        'status': 404,
        'message': 'There is no record: ' + request.url,
    }
    res = jsonify(message)
    res.status_code = 404

    return res

if __name__ == "__main__":
    app.run()	