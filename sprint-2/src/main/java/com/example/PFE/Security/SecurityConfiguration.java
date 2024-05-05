package com.example.PFE.Security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableMethodSecurity
public class SecurityConfiguration {
    private final JwtAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http.csrf(AbstractHttpConfigurer::disable)
                .cors(cors -> {
                    cors.configurationSource(corsConfigurationSource());
                })
                .authorizeHttpRequests(request -> {
                    request.requestMatchers("/register/**").permitAll();
                    request.requestMatchers("/authenticate").permitAll();
                    request.requestMatchers("/sujets/all","/sujet/get/{id}").permitAll();
                    request.requestMatchers("/user/update","user/changePassword").hasAnyAuthority("CANDIDAT","ADMIN","INTERN","PROF_SUPPERVISOR");
                    request.requestMatchers("/sujet/**","/users/**","/user/delete/{userId}","/user/update/{userId}","/candidature/**").hasAnyAuthority( "ADMIN");
                    request.requestMatchers("/postuler").hasAnyAuthority( "CANDIDAT");
                    request.requestMatchers("/encadrants").hasAnyAuthority( "ADMIN");
                    request.requestMatchers("candidature/encadrant").hasAnyAuthority( "ADMIN");
                    request.requestMatchers("/sujet/**","/users/**","/user/delete/{userId}","/user/update").hasAnyAuthority( "INTERN");
                    request.requestMatchers("/avancements").hasAnyAuthority( "PROF_SUPERVISOR");
                    request.requestMatchers("/commentaire/**","/document/**","/task/**").hasAnyAuthority( "PROF_SUPERVISOR","INTERN");




                }).sessionManagement(session -> session.sessionCreationPolicy(STATELESS))
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class).build();

    }
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173/")); // You can set specific origins instead of "*" for security
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }
}
