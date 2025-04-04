package com.example.check.response_pojo;

public class UserScore {
	private String username;
	private Long number;
	public UserScore(String username, Long number) {
		super();
		this.username = username;
		this.number = number;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public Long getNumber() {
		return number;
	}
	public void setNumber(Long number) {
		this.number = number;
	}
	public UserScore() {
		super();
	}
	@Override
	public String toString() {
		return "UserScore [username=" + username + ", number=" + number + ", getUsername()=" + getUsername()
				+ ", getNumber()=" + getNumber() + ", getClass()=" + getClass() + ", hashCode()=" + hashCode()
				+ ", toString()=" + super.toString() + "]";
	}
	
}
